import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useContactForm } from './useContactForm'

describe('useContactForm', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = vi.fn()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
    vi.useRealTimers()
  })

  it('exposes the initial state', () => {
    const { result } = renderHook(() => useContactForm({ email: '' }))
    expect(result.current.formData).toEqual({ email: '' })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.result).toBe('')
  })

  it('marks submission successful when web3forms returns success', async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    const { result } = renderHook(() => useContactForm({ email: '' }))
    let returned
    await act(async () => {
      returned = await result.current.submitForm({ name: 'Tester', email: 'a@b.com' })
    })

    expect(returned).toBe(true)
    expect(result.current.result).toBe('success')
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({ method: 'POST' }),
    )

    const body = JSON.parse(globalThis.fetch.mock.calls[0][1].body)
    expect(body).toMatchObject({
      name: 'Tester',
      email: 'a@b.com',
      access_key: expect.any(String),
      subject: expect.stringContaining('New Inquiry'),
    })
  })

  it('marks submission failed on network error', async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error('offline'))

    const { result } = renderHook(() => useContactForm({ email: '' }))
    let returned
    await act(async () => {
      returned = await result.current.submitForm({ email: 'a@b.com' })
    })

    expect(returned).toBe(false)
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.result).toBe('error')
  })
})
