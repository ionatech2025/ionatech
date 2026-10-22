import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Team from './Team'
import { deriveTagFromRole, mergeTeamMembers } from '../../data/team'

describe('Team component & admin role updates', () => {
  const originalFetch = globalThis.fetch
  const originalScrollTo = Element.prototype.scrollTo

  beforeEach(() => {
    globalThis.fetch = vi.fn()
    Element.prototype.scrollTo = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    Element.prototype.scrollTo = originalScrollTo
  })

  it('derives concise badges from updated admin roles', () => {
    expect(
      deriveTagFromRole('Director | CEO | Product/Project Manager | Client Acquisition Team (CAT)', 'Backend'),
    ).toBe('Director | CEO')
    expect(
      deriveTagFromRole('Director | Finance & Accounts | Client Acquisition Team (CAT)', 'Leadership'),
    ).toBe('Finance & Accounts')
    expect(
      deriveTagFromRole('Sales & Growth Lead | Social Media Marketing Lead', 'Frontend'),
    ).toBe('Sales & Growth Lead')
    expect(
      deriveTagFromRole('Engineering Lead | DevOps Lead', 'ML & Cloud'),
    ).toBe('Engineering Lead')
    expect(
      deriveTagFromRole('Director & Co-founder', 'Leadership'),
    ).toBe('Leadership')
  })

  it('merges live API team rows with fallback skills/images and filters unpublished rows', () => {
    const live = [
      {
        id: 6,
        name: 'Katongole Samuel',
        role: 'Director | CEO | Product/Project Manager',
        bio: 'Updated bio from admin panel.',
        image: null,
        sortOrder: 1,
        published: true,
      },
      {
        id: 99,
        name: 'New Member',
        role: 'Product Designer | UX Lead',
        bio: 'Brand new member added in admin.',
        image: '/images/new.jpg',
        sortOrder: 2,
        published: true,
      },
      {
        id: 2,
        name: 'Hidden Member',
        role: 'Draft Role',
        bio: '',
        image: null,
        sortOrder: 3,
        published: false,
      },
    ]

    const merged = mergeTeamMembers(live)
    expect(merged).toHaveLength(2)
    expect(merged[0]).toMatchObject({
      id: 6,
      name: 'Katongole Samuel',
      role: 'Director | CEO | Product/Project Manager',
      bio: 'Updated bio from admin panel.',
      image: '/images/sam.jpg',
      tag: 'Director | CEO',
    })
    expect(merged[0].skills.length).toBeGreaterThan(0)
    expect(merged[1]).toMatchObject({
      id: 99,
      name: 'New Member',
      role: 'Product Designer | UX Lead',
      tag: 'Product Designer',
      skills: [],
    })
  })

  it('fetches /api/content/team and reflects updated roles from the admin panel', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'Nyombi Elijah Erusaniya',
          role: 'Director | Finance & Accounts | Client Acquisition Team (CAT)',
          bio: 'Updated bio for Elijah.',
          image: '/images/elijah.jpg',
          sortOrder: 1,
          published: true,
        },
        {
          id: 6,
          name: 'Katongole Samuel',
          role: 'Director | CEO | Product/Project Manager | Client Acquisition Team (CAT)',
          bio: 'Updated bio for Samuel.',
          image: '/images/sam.jpg',
          sortOrder: 2,
          published: true,
        },
      ],
    })

    render(<Team />)

    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/content/team',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )

    await waitFor(() => {
      expect(
        screen.getByText('Director | Finance & Accounts | Client Acquisition Team (CAT)'),
      ).toBeInTheDocument()
    })
    expect(screen.getByText('Updated bio for Elijah.')).toBeInTheDocument()

    const samButton = screen.getByRole('button', { name: 'Go to Katongole Samuel' })
    fireEvent.click(samButton)

    expect(
      screen.getByText('Director | CEO | Product/Project Manager | Client Acquisition Team (CAT)'),
    ).toBeInTheDocument()
    expect(screen.getByText('Updated bio for Samuel.')).toBeInTheDocument()
  })
})
