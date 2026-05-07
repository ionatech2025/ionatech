import { useState } from 'react';
import { contact } from '../data/contact';

export const useContactForm = (initialData = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");
    const [formData, setFormData] = useState(initialData);

    const submitForm = async (data) => {
        if (!contact.web3formsAccessKey) {
            console.error('useContactForm: web3forms access key is not configured');
            setResult("error");
            return false;
        }

        setIsLoading(true);
        setResult("sending");

        const payload = {
            ...data,
            access_key: contact.web3formsAccessKey,
            subject: `New Inquiry: ${data.name || 'Newsletter/Footer'}`,
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const resData = await response.json();

            if (resData.success) {
                setResult("success");
                setFormData(initialData);
                return true;
            }
            setResult("error");
            return false;
        } catch {
            setResult("error");
            return false;
        } finally {
            setIsLoading(false);
            setTimeout(() => setResult(""), 6000);
        }
    };

    return { formData, setFormData, isLoading, result, submitForm };
};