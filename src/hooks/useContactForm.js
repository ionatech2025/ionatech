import { useState } from 'react';

{/*Handle the API calls and state management */ }

export const useContactForm = (initialData = {}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");
    const [formData, setFormData] = useState(initialData);

    const submitForm = async (data) => {
        setIsLoading(true);
        setResult("sending");

        const payload = {
            ...data,
            access_key: "059244e1-534a-434e-a22d-7add58b68447",
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
                setFormData(initialData); // Reset to initial state
                return true;
            } else {
                setResult("error");
                return false;
            }
        } catch (error) {
            setResult("error");
            return false;
        } finally {
            setIsLoading(false);
            setTimeout(() => setResult(""), 6000);
        }
    };

    return { formData, setFormData, isLoading, result, submitForm };
};