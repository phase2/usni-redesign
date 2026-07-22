import Header from '@/components/layout/Header'

/**
 * Isolated preview route for the design-system docs — embedded in an iframe so Header's
 * live, viewport-relative responsive classes (lg:hidden etc.) resolve correctly at the
 * iframe's own width. Not linked from anywhere in the site itself.
 */
export default function HeaderPreview() {
  return <Header />
}
