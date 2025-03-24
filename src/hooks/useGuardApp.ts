import { useRouter } from 'next/router'

export const useGuardApp = () => {
    const router = useRouter()

    const openGuardApp = () => {
        const safeAddress = router.query.safe?.toString() || ''
        if (safeAddress) {
            const appUrl = 'https://app.safe.getfailsafe.com/'
            const openAppUrl = `/apps/open?safe=${safeAddress}&appUrl=${encodeURIComponent(appUrl)}`
            router.push(openAppUrl)
        }
    }

    return { openGuardApp }
} 