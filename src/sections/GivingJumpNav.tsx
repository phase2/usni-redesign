import JumpLinkNav from '@/components/ui/JumpLinkNav'

const links = [
  { label: 'About the Foundation', href: '#about-the-foundation' },
  { label: 'Ways to Give', href: '#ways-to-give' },
  { label: 'Meet the Team', href: '#meet-the-team' },
  { label: 'Tax Information', href: '#tax-information' },
]

export default function GivingJumpNav() {
  return <JumpLinkNav links={links} />
}
