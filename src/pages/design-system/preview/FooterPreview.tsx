import Footer from '@/components/layout/Footer'

/**
 * Isolated preview route for the design-system docs — embedded in an iframe so Footer's
 * live, viewport-relative responsive classes (lg:flex-row etc.) resolve correctly at the
 * iframe's own width. Not linked from anywhere in the site itself.
 */
export default function FooterPreview() {
  return <Footer />
}
