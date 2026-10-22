import MagazineHero from '@/sections/MagazineHero'
import SubjectSearchBar from '@/components/ui/SubjectSearchBar'
import proceedingsLogo from '@/assets/images/Proceedings_logo_white.png'
import heroImage from '@/assets/images/proceedings-main-hero-bk.webp'

export default function ProceedingsHero() {
  return (
    <MagazineHero
      image={heroImage}
      logo={proceedingsLogo}
      logoAlt="Proceedings — U.S. Naval Institute"
      search={
        <SubjectSearchBar
          publications={['proceedings']}
          placeholder="Search Proceedings by keyword, topic, or ship"
          label="Search Proceedings"
        />
      }
    >
      Our flagship publication since 1874, Proceedings is the independent forum where military
      professionals, scholars, and strategists debate the most consequential issues facing naval and
      maritime defense. Every issue delivers peer-reviewed analysis, firsthand perspective, and bold
      argument.
    </MagazineHero>
  )
}
