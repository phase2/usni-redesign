import MagazineHero from '@/sections/MagazineHero'
import SubjectSearchBar from '@/components/ui/SubjectSearchBar'
import nhLogo from '@/assets/images/Naval_History_logo_white_500px.webp'
import heroImage from '@/assets/images/naval-history-main-hero-banner.webp'

export default function NavalHistoryHero() {
  return (
    <MagazineHero
      image={heroImage}
      logo={nhLogo}
      logoAlt="Naval History — U.S. Naval Institute"
      search={
        <SubjectSearchBar
          publications={['naval-history']}
          placeholder="Search Naval History by keyword, conflict, or ship"
          label="Search Naval History"
        />
      }
    >
      The world's most authoritative and engaging periodical for readers interested in nautical
      heritage. Published six times a year, Naval History brings the past to life through firsthand
      accounts, bold scholarship, and stunning imagery.
    </MagazineHero>
  )
}
