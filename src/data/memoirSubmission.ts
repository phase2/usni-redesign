/**
 * Copy and options for Submit a Memoir (/archives/memoirs/submit).
 *
 * Transcribed from the live webform at /archives/memoirs/submit. The live
 * Agreements step runs the eight warranties together as one paragraph; they
 * are split into a list here, wording unchanged.
 */

export const MEMOIR_STEPS = ['Introduction', 'Agreements', 'Memoir', 'Complete']

export const memoirIntro =
  'Once you are completely satisfied with your memoir, simply follow the steps below to upload, confirm you have read and agree to the terms of the Memoir License and Collection Agreement, and your memoir will become part of U.S. Naval Institute Memoir Collection following an expedited editorial review within ninety days.'

export const warrantiesLead =
  'By clicking below, you agree that in order to have your Memoir included in the USNI Memoir Collection, you represent and warrant to USNI that:'

export const warranties = [
  'your Memoir is factual and accurate to the best of your recollection;',
  'your Memoir will not infringe any copyright or other proprietary right of any third party;',
  'your Memoir will not breach any intellectual property right, obligation of confidentiality, trade secret right, or similar agreement with or obligation to any other individual or entity;',
  'your Memoir does not contain any material that is scandalous, libelous, obscene, an invasion of privacy, or otherwise unlawful;',
  'your Memoir is wholly original with you and reflects your best recollection of the events described therein;',
  'your Memoir does not personally attack any individual, living or deceased;',
  'your Memoir does not speak on any subject with malicious intent; and',
  'your Memoir does not contain any classified material or material that otherwise may not lawfully be included.',
]

export const warrantiesClose =
  'You understand and acknowledge that USNI will not make an independent investigation of the representations and warranties set forth above, and will rely entirely upon your representations, warranties and due diligence.'

/**
 * The agreement page is unpublished on the test site (403), so its text could
 * not be migrated. Link to production, which opens it in a new tab as the live
 * form does.
 */
export const LICENSE_AGREEMENT_HREF =
  'https://www.usni.org/archives/memoirs/memoir-license-and-collection-agreement'

/**
 * PLACEHOLDER — confirm against the live form. "Engagements" is a required
 * multi-select there, but its option list was not captured.
 */
export const engagements = [
  'World War I',
  'World War II',
  'Korean War',
  'Vietnam War',
  'Cold War',
  'Gulf War',
  'Iraq War',
  'War in Afghanistan',
  'Peacetime service',
  'Other',
]

export const MEMOIR_DOC_EXT = ['.doc', '.docx', '.pdf', '.txt']
export const MEMOIR_IMAGE_EXT = ['.jpeg', '.jpg', '.png']
export const MEMOIR_FILE_MAX_MB = 100

/** "For further information about memoirs…" — the live Complete step. */
export const memoirContact = {
  name: 'Mr. Jack Russell',
  role: 'Sales and Marketing Manager',
  email: 'jrussell@usni.org',
  phone: '410-295-1029',
}
