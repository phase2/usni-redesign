import imgAdamKane from '@/assets/images/leadership/adam-kane.png'
import imgAdmCharlesRichardUsn from '@/assets/images/leadership/adm-charles-richard-usn.jpg'
import imgAdmHarryBHarrisJrUsn from '@/assets/images/leadership/adm-harry-b-harris-jr-usn.jpg'
import imgAdmJamesGStavridisUsn from '@/assets/images/leadership/adm-james-g-stavridis-usn.jpg'
import imgAprilParreco from '@/assets/images/leadership/april-parreco.png'
import imgBgenSamuelLMeyerUsmc from '@/assets/images/leadership/bgen-samuel-l-meyer-usmc.jpg'
import imgCMichaelPetters from '@/assets/images/leadership/c-michael-petters.jpg'
import imgCaptBillHambletUsn from '@/assets/images/leadership/capt-bill-hamblet-usn.jpg'
import imgCaptCraigHAllenJrUscg from '@/assets/images/leadership/capt-craig-h-allen-jr-uscg.jpg'
import imgCaptDevereJCrooksUsn from '@/assets/images/leadership/capt-devere-j-crooks-usn.jpg'
import imgCaptJoelIHolwittUsn from '@/assets/images/leadership/capt-joel-i-holwitt-usn.jpg'
import imgCaptMichaelJSalvatoUsn from '@/assets/images/leadership/capt-michael-j-salvato-usn.jpg'
import imgCdrFrankJWeisserUsn from '@/assets/images/leadership/cdr-frank-j-weisser-usn.jpg'
import imgCdrGregoryEGlarosUsn from '@/assets/images/leadership/cdr-gregory-e-glaros-usn.jpg'
import imgChipWallen from '@/assets/images/leadership/chip-wallen.jpg'
import imgColEricReidUsmc from '@/assets/images/leadership/col-eric-reid-usmc.jpg'
import imgDirkMosis from '@/assets/images/leadership/dirk-mosis.jpg'
import imgGenPeterPaceUsmc from '@/assets/images/leadership/gen-peter-pace-usmc.png'
import imgGeneralKennethFFrankMckenzieJrUsmc from '@/assets/images/leadership/general-kenneth-f-frank-mckenzie-jr-usmc.jpg'
import imgGysgtAbigailSeitzUsmc from '@/assets/images/leadership/gysgt-abigail-seitz-usmc.jpg'
import imgJohnMajorasEsq from '@/assets/images/leadership/john-majoras-esq.jpg'
import imgLauraMccullough from '@/assets/images/leadership/laura-mccullough.png'
import imgLcdrJamesDJimHalsellUsn from '@/assets/images/leadership/lcdr-james-d-jim-halsell-usn.jpg'
import imgLtGaryKimUsnr from '@/assets/images/leadership/lt-gary-kim-usnr.jpg'
import imgLtgenKarstenHecklUsmc from '@/assets/images/leadership/ltgen-karsten-heckl-usmc.jpg'
import imgLtgenLoriEReynoldsUsmc from '@/assets/images/leadership/ltgen-lori-e-reynolds-usmc.jpg'
import imgMajWalkerDMillsUsmc from '@/assets/images/leadership/maj-walker-d-mills-usmc.jpg'
import imgMartinJMartyBollinger from '@/assets/images/leadership/martin-j-marty-bollinger.jpg'
import imgMcponRussellLSmithUsn from '@/assets/images/leadership/mcpon-russell-l-smith-usn.jpg'
import imgMelImmergut from '@/assets/images/leadership/mel-immergut.jpg'
import imgMichaelMWisemanEsq from '@/assets/images/leadership/michael-m-wiseman-esq.png'
import imgMrMelImmergut from '@/assets/images/leadership/mr-mel-immergut.png'
import imgMrStephenMWaters from '@/assets/images/leadership/mr-stephen-m-waters.png'
import imgMrWilliamJHannigan from '@/assets/images/leadership/mr-william-j-hannigan.jpg'
import imgMrsMaticeWrightSpringer from '@/assets/images/leadership/mrs-matice-wright-springer.jpg'
import imgRadmDerekTrinqueUsn from '@/assets/images/leadership/radm-derek-trinque-usn.jpg'
import imgRadmRaymondASpicerUsn from '@/assets/images/leadership/radm-raymond-a-spicer-usn.jpg'
import imgRadmTiffanyDanko from '@/assets/images/leadership/radm-tiffany-danko.jpg'
import imgRobColenso from '@/assets/images/leadership/rob-colenso.png'
import imgSunilRamchand from '@/assets/images/leadership/sunil-ramchand.jpg'
import imgTheHonorableEllenMLord from '@/assets/images/leadership/the-honorable-ellen-m-lord.jpg'
import imgTheHonorableGordonREngland from '@/assets/images/leadership/the-honorable-gordon-r-england.png'
import imgTheHonorableSeanJStackley from '@/assets/images/leadership/the-honorable-sean-j-stackley.jpg'
import imgVadmFredMMidgetteUscg from '@/assets/images/leadership/vadm-fred-m-midgette-uscg.jpg'
import imgWatermark from '@/assets/images/new-usni-default-watermark.png'

/**
 * Stand-in for anyone without a headshot. The artwork carries its own margin on
 * a #F7F7F2 field, so it fills the circle and needs no zoom — see the
 * placeholder branch in LeadershipRoster.
 */
export const PLACEHOLDER_IMAGE = imgWatermark

export interface Person {
  name: string
  /** Role and committee lines, in the order they appear on the current site. */
  titles: string[]
  image: string
  /** Bio route. Executive Staff have pages (see leadershipBios.ts); the rest 404 for now. */
  href: string
}

/**
 * Four people carry no bio link on the current site; they get a prototype
 * route here anyway so the roster reads consistently:
 * Michael M. Wiseman, Esq., Mr. Stephen M. Waters, RADM Derek Trinque, USN, The Honorable Gordon R. England.
 */

export const executiveStaff: Person[] = [
  {
    name: 'RADM Raymond A. Spicer, USN (Ret.)',
    titles: ['Chief Executive Officer and Publisher'],
    image: imgRadmRaymondASpicerUsn,
    href: '/about/leadership/radm-ray-spicer-usn-ret',
  },
  {
    name: 'Rob Colenso',
    titles: ['Chief Experience Officer (CXO)'],
    image: imgRobColenso,
    href: '/about/leadership/rob-colenso',
  },
  {
    name: 'CAPT Bill Hamblet, USN (Ret.)',
    titles: ['Executive Vice President for Periodicals and Editor-in-Chief, Proceedings'],
    image: imgCaptBillHambletUsn,
    href: '/about/leadership/capt-bill-hamblet-usn-ret',
  },
  {
    name: 'April Parreco',
    titles: ['Executive Vice President, Conferences and Events'],
    image: imgAprilParreco,
    href: '/about/leadership/april-parreco',
  },
  {
    name: 'Laura McCullough',
    titles: ['Chief Development Officer'],
    image: imgLauraMccullough,
    href: '/about/leadership/laura-mccullough',
  },
  {
    name: 'Adam Kane',
    titles: ['Director, Naval Institute Press'],
    image: imgAdamKane,
    href: '/about/leadership/adam-kane',
  },
  {
    name: 'Chip Wallen',
    titles: ['Chief Financial Officer'],
    image: imgChipWallen,
    href: '/about/leadership/chip-wallen',
  },
]

export const boardOfDirectors: Person[] = [
  {
    name: 'ADM Harry B. Harris Jr., USN (Ret.)',
    titles: ['Chair'],
    image: imgAdmHarryBHarrisJrUsn,
    href: '/about/leadership/adm-harry-harris',
  },
  {
    name: 'ADM James G. Stavridis, USN (Ret.)',
    titles: ['Chair Emeritus', 'Operating Executive, The Carlyle Group'],
    image: imgAdmJamesGStavridisUsn,
    href: '/about/leadership/adm-james-g-stavridis-usn-ret',
  },
  {
    name: 'The Honorable Ellen M. Lord',
    titles: ['Vice Chair', 'Chair, Nominating & Governance Committee'],
    image: imgTheHonorableEllenMLord,
    href: '/about/leadership/honorable-ellen-m-lord',
  },
  {
    name: 'RADM Raymond A. Spicer, USN (Ret.)',
    titles: ['Chief Executive Officer and Publisher', 'Nominating & Governance Committee'],
    image: imgRadmRaymondASpicerUsn,
    href: '/about/leadership/radm-ray-spicer-usn-ret',
  },
  {
    name: 'CAPT DeVere J. Crooks, USN',
    titles: ['Chair, Editorial Board'],
    image: imgCaptDevereJCrooksUsn,
    href: '/about/leadership/cdr-crooks-usn',
  },
  {
    name: 'Mr. William J. Hannigan',
    titles: ['Compensation Committee'],
    image: imgMrWilliamJHannigan,
    href: '/about/leadership/william-hannigan',
  },
  {
    name: 'LtGen Karsten Heckl, USMC (Ret.)',
    titles: [],
    image: imgLtgenKarstenHecklUsmc,
    href: '/about/leadership/ltgen-heckl-usmc-ret',
  },
  {
    name: 'Mel Immergut',
    titles: ['Chair, Audit Committee', 'Finance Committee'],
    image: imgMelImmergut,
    href: '/about/leadership/mel-immergut',
  },
  {
    name: 'General Kenneth F. “Frank” McKenzie Jr., USMC (Ret.)',
    titles: ['Nominating & Governance Committee'],
    image: imgGeneralKennethFFrankMckenzieJrUsmc,
    href: '/about/leadership/gen-frank-mckenzie-usmc',
  },
  {
    name: 'LT Gary Kim, USNR',
    titles: [],
    image: imgLtGaryKimUsnr,
    href: '/about/leadership/lt-kim-usnr',
  },
  {
    name: 'VADM Fred M. Midgette, USCG (Ret.)',
    titles: ['Nominating & Governance Committee'],
    image: imgVadmFredMMidgetteUscg,
    href: '/about/leadership/vadm-midgette-uscg-ret',
  },
  {
    name: 'C. Michael Petters',
    titles: ['Finance Committee'],
    image: imgCMichaelPetters,
    href: '/about/leadership/c-michael-petters',
  },
  {
    name: 'Sunil Ramchand',
    titles: [],
    image: imgSunilRamchand,
    href: '/about/leadership/sunil-ramchand',
  },
  {
    name: 'LtGen Lori E. Reynolds, USMC (Ret.)',
    titles: ['Audit Committee'],
    image: imgLtgenLoriEReynoldsUsmc,
    href: '/about/leadership/ltgen-lori-e-reynolds-usmc-ret',
  },
  {
    name: 'ADM Charles Richard, USN (Ret.)',
    titles: ['Audit Committee'],
    image: imgAdmCharlesRichardUsn,
    href: '/about/leadership/adm-charles-richard-usn-ret',
  },
  {
    name: 'MCPON Russell L. Smith, USN (Ret.)',
    titles: ['Compensation Committee'],
    image: imgMcponRussellLSmithUsn,
    href: '/about/leadership/mcpon-russell-l-smith-usn-ret',
  },
  {
    name: 'The Honorable Sean J. Stackley',
    titles: ['Finance Committee'],
    image: imgTheHonorableSeanJStackley,
    href: '/about/leadership/honorable-sean-stackley',
  },
  {
    name: 'CDR Frank J. Weisser, USN (Ret.)',
    titles: [],
    image: imgCdrFrankJWeisserUsn,
    href: '/about/leadership/cdr-frank-j-weisser-usn-ret',
  },
  {
    name: 'Mrs. Matice Wright-Springer',
    titles: ['Audit Committee'],
    image: imgMrsMaticeWrightSpringer,
    href: '/about/leadership/matice-wright-springer',
  },
]

export const boardLiaisons: Person[] = [
  {
    name: 'RADM Derek Trinque, USN',
    titles: ['Liaison, U.S. Navy'],
    image: imgRadmDerekTrinqueUsn,
    href: '/about/leadership/radm-derek-trinque-usn',
  },
  {
    name: 'BGen Samuel L. Meyer, USMC',
    titles: ['Liaison, U.S. Marine Corps'],
    image: imgBgenSamuelLMeyerUsmc,
    href: '/about/leadership/brigadier-general-meyer',
  },
  {
    name: 'RADM Tiffany Danko',
    titles: ['Liaison, U.S. Coast Guard'],
    image: imgRadmTiffanyDanko,
    href: '/about/leadership/rear-admiral-tiffany-danko-coast-guard-liaison',
  },
]

export const foundationTrustees: Person[] = [
  {
    name: 'Gen Peter Pace, USMC (Ret.)',
    titles: ['Chair'],
    image: imgGenPeterPaceUsmc,
    href: '/about/leadership/gen-peter-pace-usmc-ret',
  },
  {
    name: 'Michael M. Wiseman, Esq.',
    titles: ['Vice Chair'],
    image: imgMichaelMWisemanEsq,
    href: '/about/leadership/michael-m-wiseman-esq',
  },
  {
    name: 'The Honorable Gordon R. England',
    titles: ['Trustee Emeritus'],
    image: imgTheHonorableGordonREngland,
    href: '/about/leadership/the-honorable-gordon-r-england',
  },
  {
    name: 'RADM Raymond A. Spicer, USN (Ret.)',
    titles: ['Chief Executive Officer and Publisher'],
    image: imgRadmRaymondASpicerUsn,
    href: '/about/leadership/radm-ray-spicer-usn-ret',
  },
  {
    name: 'Martin J. "Marty" Bollinger',
    titles: [],
    image: imgMartinJMartyBollinger,
    href: '/about/leadership/martin-j-bollinger',
  },
  {
    name: 'CDR Gregory E. Glaros, USN (Ret.)',
    titles: [],
    image: imgCdrGregoryEGlarosUsn,
    href: '/about/leadership/glaros-usn-ret',
  },
  {
    name: 'Mr. Mel Immergut',
    titles: [],
    image: imgMrMelImmergut,
    href: '/about/leadership/mel-immergut',
  },
  {
    name: 'John Majoras, Esq.',
    titles: [],
    image: imgJohnMajorasEsq,
    href: '/about/leadership/john-m-majoras',
  },
  {
    name: 'Laura McCullough',
    titles: ['Chief Development Officer'],
    image: imgLauraMccullough,
    href: '/about/leadership/laura-mccullough',
  },
  {
    name: 'Dirk Mosis',
    titles: [],
    image: imgDirkMosis,
    href: '/about/leadership/dirk-pd-mosis-iii',
  },
  {
    name: 'CAPT Michael J. Salvato, USN (Ret.)',
    titles: [],
    image: imgCaptMichaelJSalvatoUsn,
    href: '/about/leadership/capt-michael-j-salvato-usn-ret',
  },
  {
    name: 'Mr. Stephen M. Waters',
    titles: [],
    image: imgMrStephenMWaters,
    href: '/about/leadership/mr-stephen-m-waters',
  },
]

export const editorialBoard: Person[] = [
  {
    name: 'CAPT Craig H. Allen Jr., USCG',
    titles: [],
    image: imgCaptCraigHAllenJrUscg,
    href: '/about/leadership/capt-craig-h-allen-jr-uscg',
  },
  {
    name: 'CDR Rhett Z. Begley, USN',
    titles: [],
    image: PLACEHOLDER_IMAGE,
    href: '/about/leadership/cdr-begley-usn',
  },
  {
    name: 'CAPT DeVere J. Crooks, USN',
    titles: ['Chair'],
    image: imgCaptDevereJCrooksUsn,
    href: '/about/leadership/cdr-crooks-usn',
  },
  {
    name: 'LCDR James D. “Jim” Halsell, USN',
    titles: [],
    image: imgLcdrJamesDJimHalsellUsn,
    href: '/about/leadership/lieutenant-commander-james-d-jim-halsell',
  },
  {
    name: 'CAPT Joel I. Holwitt, USN',
    titles: [],
    image: imgCaptJoelIHolwittUsn,
    href: '/about/leadership/capt-holwitt-usn',
  },
  {
    name: 'LCDR Mark Jbeily, USN',
    titles: [],
    image: PLACEHOLDER_IMAGE,
    href: '/about/leadership/lcdr-mark-jbeily-usn',
  },
  {
    name: 'LT Gary Kim, USNR',
    titles: [],
    image: imgLtGaryKimUsnr,
    href: '/about/leadership/lt-kim-usnr',
  },
  {
    name: 'Maj Walker D. Mills, USMC',
    titles: [],
    image: imgMajWalkerDMillsUsmc,
    href: '/about/leadership/capt-walker-d-mills-usmc',
  },
  {
    name: 'Col Eric Reid, USMC',
    titles: [],
    image: imgColEricReidUsmc,
    href: '/about/leadership/col-eric-reid-usmc',
  },
  {
    name: 'GySgt Abigail Seitz, USMC',
    titles: [],
    image: imgGysgtAbigailSeitzUsmc,
    href: '/about/leadership/gysgt-abigail-seitz-usmc',
  },
]
