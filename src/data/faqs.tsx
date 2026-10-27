import type { ReactNode } from 'react'
import digitalReaderHowTo from '@/assets/images/faq-digital-reader-how-to.jpg'

/**
 * Every FAQ on the site, transcribed from the live /faq page.
 *
 * Topics follow the order of the live page's "FAQ Topics" list rather than the
 * order its sections render in, which disagree. Questions keep the live order
 * and wording within each topic. Answers are JSX rather than strings because
 * the live copy carries links, lists, emphasis, and one instructional image.
 *
 * Deviations from the live markup, all link repairs:
 * - Ship's Store's anchor is `ships-store`; the live one is `ship039s-store`,
 *   an HTML-escaped apostrophe that the topic link no longer matches.
 * - The research@usni.org mailto links carried a pasted paragraph inside the
 *   address; only the subject line is kept.
 * - The oral history order contact read ehegranes@usni.org but mailed
 *   emills@usni.org; it now mails the address it shows.
 * - Links to USNI pages the prototype has built point at the prototype route.
 */
export interface Faq {
  q: string
  a: ReactNode
}

export interface FaqTopic {
  /** In-page anchor, without the `#`. */
  id: string
  title: string
  questions: Faq[]
}

export const faqTopics: FaqTopic[] = [
  {
    id: 'research-library-and-archive',
    title: 'Research Library and Archive',
    questions: [
      {
        q: 'How do I find research assistance on past articles or get copies of articles?',
        a: (
          <p>Contact the Naval Institute Archives<br />A fee is charged.<br />Phone: 410-295-1023<br />Fax: 410-269-7940<br />Email <a href="mailto:research@usni.org?subject=Research%20Assistance" className="text-link">research@usni.org</a></p>
        ),
      },
      {
        q: 'How do I obtain copies of past Proceedings or Naval History articles?',
        a: (
          <p>Email <a href="mailto:research@usni.org?subject=Copy%20of%20Past%20Article" className="text-link">research@usni.org</a>.</p>
        ),
      },
      {
        q: 'May I borrow a book?',
        a: (
          <p>We are not a lending library, but you are welcome to visit and use our library to conduct your research.</p>
        ),
      },
      {
        q: 'How long does research take?',
        a: (
          <>
            <p>We are open to the public &amp; invite individuals to visit and conduct research on-site. Library visits can be scheduled by calling (410) 295-1022.</p>
            <p>Additionally, our library staff is available to assist with research requests from individuals who are not able to visit us in Beach Hall. Simple requests are normally handled within 24-48 hours. Detailed requests may take longer as required.</p>
            <p>Research requests can be addressed to <a href="mailto:research@usni.org?subject=Copy%20of%20Past%20Article" className="text-link">research@usni.org</a>.</p>
          </>
        ),
      },
    ],
  },
  {
    id: 'ebooks',
    title: 'eBooks',
    questions: [
      {
        q: 'Other eBook Questions?',
        a: (
          <p>For all other Book related inquiries, please email <a href="mailto:trade@usni.org" className="text-link">trade@usni.org</a>.</p>
        ),
      },
      {
        q: 'Are all Naval Institute Press titles available in eBook form?',
        a: (
          <p>No. Naval Institute Press is only making select titles available in eBook form.</p>
        ),
      },
      {
        q: 'Can I buy an eBook directly from the U.S. Naval Institute website?',
        a: (
          <p>No. eBooks published by Naval Institute Press are only available through our eRetail partners.</p>
        ),
      },
      {
        q: 'Does my member discount apply when purchasing Naval Institute Press eBooks?',
        a: (
          <p>No. Because eBooks are purchased through our eRetail partners, not directly from Naval Institute Press, your member discount is not applicable. Each of our eRetail partners, however, does discount the price of each title. See the specific vendor site of your choice for detailed pricing information for each title.</p>
        ),
      },
      {
        q: 'Where are Naval Institute Press eBooks sold?',
        a: (
          <>
            <p><strong><a href="https://bit.ly/gd6cIC" className="text-link">Amazon Kindle Store</a></strong></p>
            <p><strong><a href="https://itunes.apple.com/us/genre/books/id38?mt=11" className="text-link">Apple iBooks for iPad and iPhone</a></strong></p>
            <p><strong><a href="https://www.barnesandnoble.com/b/nook-books/_/N-8qa" className="text-link">Barnes &amp; Noble Nook Store</a></strong></p>
            <p><strong><a href="https://play.google.com/store/books?hl=en" className="text-link">Google Play</a></strong></p>
          </>
        ),
      },
      {
        q: 'Can I read eBooks on my portable device?',
        a: (
          <>
            <p>Yes. Please click on the link to your preferred reading device below and follow the instructions.</p>
            <p>Get a reader for your device:</p>
            <p><a href="https://www.amazon.com/kindle-dbs/fd/kcp" className="text-link">Amazon Kindle Reader</a></p>
            <p><a href="https://www.apple.com/ibooks/" className="text-link">Apple iBooks</a></p>
            <p><a href="https://nook.barnesandnoble.com/u/nook-reading-app/379003593" className="text-link">Barnes &amp; Noble Nook Reader</a></p>
            <p><a href="https://support.google.com/googleplay/answer/4517692" className="text-link">Google Play</a></p>
          </>
        ),
      },
      {
        q: 'Can I purchase an eBook as a gift?',
        a: (
          <p>Yes. Each of our retail partners provides instructions on how to give the gift of an eBook to a family member or friend.</p>
        ),
      },
      {
        q: 'Who do I contact if there is a problem with my eBook purchase?',
        a: (
          <p>For members and customers who encounter a problem with their eBook, please contact the retailer from whom the eBook was purchased. For example, if you experience a problem with a Naval Institute Press title for your Kindle, please contact Amazon directly.</p>
        ),
      },
    ],
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions',
    questions: [
      {
        q: 'How do I subscribe to Proceedings or Naval History magazine?',
        a: (
          <>
            <p><a href="/proceedings" className="text-link"><em>Proceedings</em></a> magazine is not available as a subscription to individuals, as it is a membership benefit of the U.S. Naval Institute.</p>
            <p>To join, please select the <a href="/membership" className="text-link">membership category of your choice</a> or call Member Services at 1-800-233-8764.</p>
            <p><a href="/naval-history/subscribe" className="text-link">Subscriptions to <em>Naval History</em> can be ordered online or by calling Member Services 1-800-233-8764.</a></p>
            <p>The subscription rate for Naval Institute members to receive <em>Naval History</em> magazine is $29 per year for six issues; for nonmembers of the Naval Institute, the subscription rate is: $39 per year.</p>
            <p>For institutions wishing to subscribe, please contact <a href="mailto:circulation@usni.org" className="text-link">circulation@usni.org</a></p>
          </>
        ),
      },
      {
        q: 'How do I unenroll from the auto renewal program?',
        a: (
          <p>Please log into your online account <a href="/login" className="text-link">here</a> to access your user profile. You will see your membership and/or subscription. Click on “Disable Auto-Renew”. Alternatively, you may contact the Member Services Department at 1-800-233-8764 for assistance.</p>
        ),
      },
      {
        q: 'Will I be notified before I am charged and my membership or subscription is renewed?',
        a: (
          <p>Yes, you will receive a notice 30 days before your credit card is charged.</p>
        ),
      },
      {
        q: 'How do I update my payment information?',
        a: (
          <p>Please contact the Member Services Department at 1-800-233-8764. An agent will be happy to assist.</p>
        ),
      },
      {
        q: 'How do I access the interactive PDF version of Naval History magazine?',
        a: (
          <p>This feature is currently unavailable for <em>Naval History</em> magazine but will be coming later in 2025.</p>
        ),
      },
    ],
  },
  {
    id: 'nip-digital-editions',
    title: 'NIP Digital Editions',
    questions: [
      {
        q: 'How do I order a book from the NIP Digital Edition?',
        a: (
          <p>Details TBD</p>
        ),
      },
      {
        q: 'How do I use the Digital Reader?',
        a: (
          <img src={digitalReaderHowTo} alt="Instructions on how to use the Digital Reader" width={640} height={1019} className="w-full max-w-[400px] h-auto" />
        ),
      },
      {
        q: 'I forgot my password, how can I reset it?',
        a: (
          <p>To reset your password, <a href="https://app-book.usni.org/resetPassword/" className="text-link">please click here</a>.</p>
        ),
      },
      {
        q: "Have a question that isn't listed?",
        a: (
          <p>Contact us at <a href="mailto:nipdigital@usni.org" className="text-link">nipdigital@usni.org</a>.</p>
        ),
      },
    ],
  },
  {
    id: 'ships-store',
    title: "Ship's Store",
    questions: [
      {
        q: 'I’m a member – where can I find the discount code?',
        a: (
          <p>We periodically send out the discount code to members via email and Member Updates on usni.org (login to <a href="/" className="text-link">usni.org</a>, then navigate to My Account and scroll down). If you’re unable to find it, please contact <a href="mailto:memberservices@usni.org" className="text-link">memberservices@usni.org</a>.</p>
        ),
      },
      {
        q: 'How long will it take to get my order?',
        a: (
          <p>Your item(s) can take up to 2-4 weeks to ship as all items are made to order.</p>
        ),
      },
      {
        q: 'Where are the items sourced?',
        a: (
          <p>Our items are sourced from the United States and India, and all designs are printed in the U.S. by our partner Marco Promotion.</p>
        ),
      },
      {
        q: 'I tried to checkout but I keep getting an error – what do I do?',
        a: (
          <p>When entering your address, we recommend: 1) Using the autofill dropdown that appears for the street address; and 2) Using the dropdown menu to select the state instead of typing it in.</p>
        ),
      },
      {
        q: 'Does your store ship internationally or to PO Boxes?',
        a: (
          <p>At this time, we unfortunately can’t fulfill orders to international addresses or PO Boxes. We hope to add this feature in the future. For now, we recommend sending to a family member or friend with a U.S.-based address.</p>
        ),
      },
      {
        q: 'I have a problem with my order.',
        a: (
          <p>The store is managed by our partner, Marco Promotion. Please contact them with any order questions or issues at <a href="mailto:stores@marcopromos.com" className="text-link">stores@marcopromos.com</a> or through their webform at <a href="https://yourmpstore.com/us-naval-institute/contact-us" className="text-link">https://yourmpstore.com/us-naval-institute/contact-us</a>.</p>
        ),
      },
      {
        q: 'Do you have a merchandise store?',
        a: (
          <p>We do – our Ship Store can be found at <a href="https://yourmpstore.com/us-naval-institute" className="text-link">https://yourmpstore.com/us-naval-institute</a>.</p>
        ),
      },
      {
        q: 'How do I purchase items through your store?',
        a: (
          <>
            <p>Go to <a href="https://yourmpstore.com/us-naval-institute" className="text-link">https://yourmpstore.com/us-naval-institute</a>, create an account if you haven’t already, add the items you’d like to purchase to your cart, and follow the checkout prompts.</p>
            <p>Remember that each item has different product and print colors and design options, so make sure to look through them all when making your selection.</p>
          </>
        ),
      },
      {
        q: 'Do I need a separate account from the one I have on usni.org to purchase items?',
        a: (
          <p>Yes – you need to make a separate account on the Ship's Store site as it’s separate from usni.org.</p>
        ),
      },
      {
        q: 'How do I get a discount?',
        a: (
          <p>All of our members receive a 20% off coupon that they can use year-round on any order made through the Ship's Store. <a href="/membership/join" className="text-link">Join today.</a></p>
        ),
      },
      {
        q: 'How often can members use the discount?',
        a: (
          <p>You can use the discount throughout the duration of your membership on multiple orders. There’s no cap on the number of times you can use the discount code.</p>
        ),
      },
      {
        q: 'What tiers of membership receive a discount?',
        a: (
          <p>All tiers of membership are eligible for a discount.</p>
        ),
      },
    ],
  },
  {
    id: 'photo-services',
    title: 'Photo Services',
    questions: [
      {
        q: 'What is the phone number I should use to order photographs?',
        a: (
          <p>Please call (410) 295-1022 to speak to our archivist.</p>
        ),
      },
      {
        q: 'What if I have a copyright question about a U.S. Naval Institute Photo?',
        a: (
          <p>Please send an email to <a href="mailto:photos@usni.org?subject=Copyright%20Question%20for%20USNI%20Photo" className="text-link">photos@usni.org</a> or call (410) 295-1022 to speak with our photo archivist.</p>
        ),
      },
      {
        q: "What if I want to use a photograph purchased through the U.S. Naval Institute's Photo Service for commercial purposes (e.g. book, video, magazine, etc.)?",
        a: (
          <p>Please send an email to <a href="mailto:photos@usni.org?subject=Commercial%20Usage%20of%20USNI%20Photograph" className="text-link">photos@usni.org</a> or call (410) 295-1022 to speak with our photo archivist for usage pricing and permission.</p>
        ),
      },
      {
        q: "How can I help preserve the Naval Institute's photo collection?",
        a: (
          <p>Funds raised allow the U.S. Naval Institute to undertake preservation projects too costly to accomplish with operating funds alone. Tax-deductible gifts to the <a href="https://photos.usni.org/" className="text-link">Photo Archive</a> are used to protect the original photo images and to digitize them so they may be more widely shared. <a href="/giving/donate" className="text-link">Click here</a> to make a gift.</p>
        ),
      },
      {
        q: 'How do I know what you have to offer if I do not see it in the online galleries?',
        a: (
          <>
            <p>Approximately 15,000 images are <a href="https://photos.usni.org/" className="text-link">available onlne</a>. However, our collection contains more than 450,000 images from the Civil War to the present.</p>
            <p>If you cannot find the photograph you would like to order in our online photo catalog, please send an email to <a href="mailto:photos@usni.org?subject=Photo%20Not%20Available%20on%20Website" className="text-link">photos@usni.org</a> or call (410) 295-1022 to speak with our photo archivist.</p>
          </>
        ),
      },
      {
        q: 'What size are the photographs?',
        a: (
          <p>Photo prints can come in a variety of sizes and are dependent on the aspect ratio of the original image. Framed and fine art photos photos can be cropped to 8" x 10" to sizes of 40” by 80”.</p>
        ),
      },
      {
        q: 'Can I order a digital image from the U.S. Naval Institute?',
        a: (
          <>
            <p>The "Digital" image tab on the U.S. Naval Institute’s <a href="https://photos.usni.org/" className="text-link">photo site</a> is intended for commercial use, and allows you to start a conversation with our photo archivist, get a price established for your project, and order the image to your specifications.</p>
            <p>Photographic prints are intended for personal use.</p>
          </>
        ),
      },
      {
        q: 'How long does it take to process a photo order?',
        a: (
          <p>You should receive your print in 7-10 days.</p>
        ),
      },
      {
        q: 'How do I order a photograph that is not found in your online galleries?',
        a: (
          <p>To order a photograph that is not displayed in our <a href="https://photos.usni.org/" className="text-link">online galleries</a>, please send an email to <a href="mailto:photos@usni.org?subject=Photo%20Not%20Available%20on%20Website" className="text-link">photos@usni.org</a> or call (410) 295-1022 to speak with our photo archivist.</p>
        ),
      },
      {
        q: 'How do I order a photograph matted and framed?',
        a: (
          <p>Follow the checkout prompts in our online photo catalog at <a href="https://photos.usni.org/" className="text-link">photos.usni.org</a>.</p>
        ),
      },
    ],
  },
  {
    id: 'oral-history',
    title: 'Oral History',
    questions: [
      {
        q: 'May I cite from the oral histories?',
        a: (
          <p>If you borrow or purchase an oral history, the rights for citing, etc. are noted in the front of the volume. Although most oral histories are classified open, some interviewees or their families request that you contact them for prior permission before citing.</p>
        ),
      },
      {
        q: 'How do I order an oral history volume?',
        a: (
          <>
            <p>Bound copies of Oral Histories are available direct from Amazon. Refer to the <a href="/archives/oral-histories" className="text-link">Oral History's page</a> to navigate to the purchase options on Amazon.</p>
            <p>Questions? <a href="mailto:ehegranes@usni.org?subject=Oral%20History%20Volume%20Order" className="text-link">ehegranes@usni.org</a> or <a href="mailto:research@usni.org?subject=Oral%20History%20Volume%20Order" className="text-link">research@usni.org</a>.</p>
            <p><a href="/archives/oral-histories/place-order" className="text-link">Learn more about ordering oral histories.</a></p>
          </>
        ),
      },
    ],
  },
  {
    id: 'user-assistance',
    title: 'User Assistance',
    questions: [
      {
        q: 'How can I sign up to get free email news alerts to Naval Institute special offers and the newsletter?',
        a: (
          <p>Just fill out our <a href="/newsletter" className="text-link">registration form</a> and become Registered User. You'll get access to our monthly newsletters and updates on Naval Institute events. You can also sign up for daily news alerts from our news service at <a href="https://news.usni.org/" className="text-link">USNI News</a>.</p>
        ),
      },
      {
        q: 'I am having problems signing-in to the Naval Institute website. What should I do?',
        a: (
          <p>If you are experiencing sign-in problems, make a note of any error messages that appear and contact Member Services at <a href="mailto:customer@usni.org" className="text-link">customer@usni.org</a> or call 1-410-268-6110 or 1-800-233-8764 (toll-free). You can also submit your questions to our <a href="mailto:webmaster@usni.org" className="text-link">Webmaster</a>. Please note the URL of the page on which the error appears and provide a screenshot if possible.</p>
        ),
      },
      {
        q: 'I cannot access the Members Only area of the Naval Institute website. What should I do?',
        a: (
          <>
            <p>The "Members Only" section of the website is for current members of the U.S. Naval Institute. If you are not a member, please consider <a href="/membership" className="text-link">joining the U.S. Naval Institute</a>.</p>
            <p>If you are a member and are having trouble logging in, please contact Member Services at 1-800-233-8764 or email <a href="mailto:member@usni.org" className="text-link">member@usni.org</a>.</p>
          </>
        ),
      },
      {
        q: 'Are User Name and Password case-sensitive?',
        a: (
          <p>Yes, please make sure you use the proper case when entering your password. A strong password should consist of both upper- and lowercase characters.</p>
        ),
      },
      {
        q: 'I have forgotten my Password. How can I find out what it is?',
        a: (
          <>
            <p>Please fill out <a href="/login" className="text-link">Forgot Password</a> form and your personal information will be emailed to you.</p>
            <p>You can also contact Member Services by email at <a href="mailto:member@usni.org" className="text-link">member@usni.org</a>.</p>
          </>
        ),
      },
      {
        q: 'How do I change my password?',
        a: (
          <>
            <p>Please visit your <a href="/account" className="text-link">user profile</a> and select the "Edit Account" option in the sidebar to change your password and other account options. Please note that you must provide your current password if you wish to make this update.</p>
            <p>If you need additional assistance, please contact Member Services directly at 1-800-233-8764 or by email at<strong> </strong><a href="mailto:member@usni.org" className="text-link">member@usni.org</a>.</p>
          </>
        ),
      },
      {
        q: "Why aren't all articles published in the print version of Proceedings available on the website?",
        a: (
          <p><em>Proceedings</em> is one of the many benefits of membership with the U.S. Naval Institute. Members can access complete articles from every <em>Proceedings</em> issue from the present back to the first issue in 1874. <a href="/membership" className="text-link">Become a member</a> of the U.S. Naval Institute to have access to the full range of content, including other benefits such as discounts on all titles from the <a href="/books" className="text-link">Naval Institute Press</a>, discounts on graphic novels from <a href="https://www.deadreckoning.org/" className="text-link">Dead Reckoning</a>, invitations to <a href="/events" className="text-link">special events</a>, and discount subscription rates to<em> <a href="/naval-history" className="text-link">Naval History</a></em> magazine, and so much more.</p>
        ),
      },
      {
        q: 'I filled out the registration form and clicked on submit, but I keep getting redirected back to the registration form. Why is this happening?',
        a: (
          <p>In order to successfully complete the registration process, all required fields (marked with an *asterisk) must be completed. For further assistance, please contact a Member Services Representative at <a href="mailto:customer@usni.org" className="text-link">customer@usni.org</a> or call 1-410-268-6110 or 1-800-233-8764 (toll-free).</p>
        ),
      },
      {
        q: "Where can I find the U.S. Naval Institute's Privacy Statement?",
        a: (
          <p>The Privacy Statement may be viewed <a href="/privacy" className="text-link">here</a>.</p>
        ),
      },
    ],
  },
  {
    id: 'membership',
    title: 'Membership',
    questions: [
      {
        q: 'How do I access the interactive PDF version of Proceedings magazine?',
        a: (
          <>
            <p>Log into your account at usni.org and go to <a href="https://www.usni.org/proceedings-digital-edition-archive" className="text-link">usni.org/proceedings-digital-edition-archive</a>, then click on whichever edition you want to view.</p>
            <p>You can also go to the <a href="/proceedings/all-issues" className="text-link">all issues page</a>, select the issue you want to view, then click on “<em>Proceedings</em> Digital Edition (PDF) (member only benefit)” under the magazine cover.</p>
            <p>Note that <strong>you must have an active membership</strong> to access this benefit. If you are not a member, please <a href="/membership/join" className="text-link">join or renew your membership</a> to get access.</p>
            <p>Interactive PDFs are currently only available from the November 2024 issue of <em>Proceedings</em> onward.</p>
          </>
        ),
      },
      {
        q: 'How do I join the U.S. Naval Institute?',
        a: (
          <>
            <p>You can <a href="/membership" className="text-link">join online</a> by selecting the membership category of your choice. The Naval Institute offers several categories of membership from student to digital to lifetime membership.</p>
            <p>Or you can contact the Member Services Department by telephone:<br />Phone: 1-800-233-8764 or 410-268-6110<br />Fax: 410-571-1703</p>
            <p>You can also contact Member Services by email at <a href="mailto:member@usni.org" className="text-link">member@usni.org</a></p>
          </>
        ),
      },
      {
        q: 'How do I become a Member of the U.S. Naval Institute?',
        a: (
          <>
            <p>Please visit our <a href="/membership" className="text-link">Membership page</a> and select your preferred category of membership. Once selected, you can pay for Membership by using your MasterCard, VISA or American Express. All transactions are secure and encrypted.</p>
            <p>If you prefer, you can also join by calling toll-free 1-800-233-8764.</p>
          </>
        ),
      },
      {
        q: 'How do I check the status of my Membership?',
        a: (
          <>
            <p>You can review your Membership status by logging into your <a href="/account" className="text-link">Member Profile</a> page or by contacting Member Services.</p>
            <p>Phone: 1-800-233-8764 or 410-268-6110<br />Fax: 410-571-1703<br />Email: <a href="mailto:member@usni.org" className="text-link">member@usni.org</a></p>
          </>
        ),
      },
      {
        q: 'How do I give a gift Membership?',
        a: (
          <p>To send a Gift Membership, please visit our <a href="/membership" className="text-link">Membership category</a> page and select the category of your choice. Check “Is this membership a gift for another person?” option prior to adding the Membership to your cart.</p>
        ),
      },
      {
        q: "I'm a Member and would like to also subscribe to Naval History magazine. How do I subscribe?",
        a: (
          <>
            <p>Subscriptions to <em>Naval History</em> magazine are just $32 for active members.</p>
            <p>To subscribe, visit the <a href="/naval-history/subscribe" className="text-link"><em>Naval History</em> subscription page</a>.</p>
            <p>Please be sure to log in to receive the discounted Member rate.</p>
            <p>You may also contact Member Services at 1-800-233-8764 or send an email to <a href="mailto:member@usni.org" className="text-link">member@usni.org</a>.</p>
          </>
        ),
      },
      {
        q: 'How do I report a change of address?',
        a: (
          <p>You may log into your account by visiting <a href="/login" className="text-link">www.usni.org/login</a>. You may also contact Member Services at 1-800-233-8764 to notify them of your change of address or by e-mail at <a href="mailto:member@usni.org" className="text-link">member@usni.org</a>.</p>
        ),
      },
      {
        q: 'How do I renew my Naval Institute Membership or my Naval History subscription?',
        a: (
          <>
            <p>To renew your Naval Institute Membership or your Naval History subscription, please log in to your <a href="/account" className="text-link">Member account page</a> and select "Renew." You may also contact Member Services:</p>
            <p>By phone:</p>
            <p>1-800-233-8764<br />or 410-268-6110.</p>
            <p>By Fax: 410-571-1703</p>
            <p>Or by email: <a href="mailto:customer@usni.org" className="text-link">customer@usni.org</a>.</p>
          </>
        ),
      },
      {
        q: "Why did I get a Membership solicitation when I'm already a member?",
        a: (
          <>
            <p>Sometimes, no matter how we try to prevent it from happening, you may receive an invitation to join the U.S. Naval Institute by mail or email, even though you are currently a member in good standing. Why? Our database sometimes fails to match your name and address, as it appears on the mailing, with the name and address under which your membership is recorded. This situation can occur due to misspellings, issues of home versus business addresses, or nickname versus proper name, changes of address, or a variety of other reasons.</p>
            <p>If you receive a membership invitation in error, please mark "Already a Member" on the application and return it to us in the provided envelope. This will ensure we don't continue to mail membership solicitations to this address.</p>
          </>
        ),
      },
      {
        q: 'What are the benefits of joining the U.S. Naval Institute?',
        a: (
          <>
            <p>Membership with the U.S. Naval Institute puts you in a community of engaged citizens that believe in our mission: Since 1873, the U.S. Naval Institute has been the nation’s foremost open, independent, and non-partisan forum for those dare to read, think, speak, and write to advance the professional, literary, and scientific understanding of sea power and other issues critical to global security.</p>
            <p>Our members write, debate, and discuss key issues that ultimately strengthens the Navy, Marine Corps, and Coast Guard. Membership benefits include: a subscription to our award-winning <a href="/proceedings" className="text-link"><em>Proceedings</em></a> magazine; discounts to over 1,000 titles from books published by the <a href="/books" className="text-link">Naval Institute Press</a>; a discounted subscription to <a href="/naval-history" className="text-link"><em>Naval History</em></a> magazine; a subscription to our weekly USNI News members-only newsletter; special invitations to conferences and events; access to over 150 years of archival information such as historic photos, oral histories, and so much more!</p>
          </>
        ),
      },
      {
        q: 'Whom do I contact about a billing or account problem?',
        a: (
          <p>Please contact our Accounting Department<br />By Phone: 1-800-233-8764 or 410-268-6110<br />By Email: <a href="mailto:accounting@usni.org" className="text-link">accounting@usni.org</a></p>
        ),
      },
      {
        q: 'How do I locate my Member number?',
        a: (
          <>
            <p>Your Member number can be found in your member profile when you are <a href="/account" className="text-link">logged in</a> to the U.S. Naval Institute website. It can also be found on the address label of your <em>Proceedings</em> or <em>Naval History</em> magazine. Located above your name, it's the first eight digits, beginning with the letter C followed by two or three zeroes.</p>
            <p>Alternately, you can contact Member Services at 1-800-233-8764 or email <a href="mailto:member@usni.org" className="text-link">member@usni.org</a> for a replacement member card.</p>
          </>
        ),
      },
      {
        q: 'I ordered the 2018–19 Membership Directory and have not received it yet. Whom do I call to find out where it is?',
        a: (
          <p>The Naval Institute partnered with PCI (Publishing Concepts, Inc.) to produce the Membership Directory. Please call PCI’s customer service line at 1-800-982-1590 if you have any questions or concerns about the Directory. Should PCI not be able to answer your question, or if you have additional questions, you can call U.S. Naval Institute Member Services at 1-800-233-8764 Monday through Friday, 8:00 AM to 4:30 PM or email <a href="mailto:member@usni.org" className="text-link">member@usni.org</a></p>
        ),
      },
    ],
  },
  {
    id: 'purchasing-books-on-usniorg',
    title: 'Purchasing Books on usni.org',
    questions: [
      {
        q: 'What if I have a rush order?',
        a: (
          <p>For same-day shipping via UPS (Ground, Two-Day, Next Day Air), orders must be placed by 12:00 PM EST/EDT.</p>
        ),
      },
      {
        q: 'If I live overseas, am I responsible for paying import VAT or duties on my book orders?',
        a: (
          <p><strong>YES! Buyers with non-US addresses are responsible for paying any Import VAT and Duties. This will need to be paid directly to the courier before the courier can complete the delivery.</strong></p>
        ),
      },
      {
        q: 'Will I receive confirmation of my order?',
        a: (
          <>
            <p>Onscreen confirmation of each order placed through our secure server is provided. It may take up to 30 seconds (depending on the amount of traffic on our server, the level of Internet congestion in general, and the speed of your Internet connection) for the confirmation screen to appear. If you hit the back button of your browser before the confirmation screen appears, the confirmation screen will not load in your browser. This has no effect, however, on the ordering process itself. Once you submit an order it is immediately sent to us.</p>
            <p>You can print your confirmation page and keep it for your records or future reference. If you have any questions about whether your order was received, please contact our <a href="mailto:customer@usni.org" className="text-link">Customer Service Department</a>.</p>
          </>
        ),
      },
      {
        q: 'Can I save my shopping cart and continue shopping later?',
        a: (
          <p>Your shopping cart is automatically saved whenever you add products or make changes. This feature enables you to leave the site and return to your cart at a later time to finish your order. Please note you must be logged in and have cookies enabled in your browser for this to work.</p>
        ),
      },
      {
        q: 'What is your return policy on books?',
        a: (
          <>
            <p>If you are not pleased with your book purchase, you may return it in saleable condition (no rips, tears, stains, folded pages) within 60 days of receipt for an exchange or full refund, less shipping and handling fees, to:</p>
            <p className="pl-6">Returns: Naval Institute Press 20AS162<br />c/o Ingram Publisher Services<br />191 Edwards Dr.<br />Jackson, TN 38301<br />United States</p>
            <p>Refunds will be given or credited on the payment method of the order; payment by credit card will be refunded to that card, and if the payment is by check a check shall be issued in return.</p>
            <p>Returns must have a copy of the original packing list. If one is not available, please contact Member Services at 1-800-233-8764 or by email at <a href="mailto:customer@usni.org" className="text-link">customer@usni.org</a>. Customers outside of the U.S. may contact us at 1-410-268-6110.</p>
            <p>If it is determined that the return is necessary due to an error on the part of the U.S. Naval Institute, shipping and handling fees will be refunded.</p>
            <p>The time period for processing a return is as follows:</p>
            <ul className="list-disc pl-6 flex flex-col gap-2"><li>5 to 10 business days for U.S. Naval Institute to receive the return</li><li>5 to 7 business days for U.S. Naval Institute to process the return</li></ul>
          </>
        ),
      },
    ],
  },
  {
    id: 'naval-institute-press',
    title: 'Naval Institute Press',
    questions: [
      {
        q: 'How do I find out more about submitting a book manuscript?',
        a: (
          <p>Please refer to our detailed <a href="/books/about/writing" className="text-link">book manuscript submission guidelines</a>.</p>
        ),
      },
      {
        q: 'How do I contact a Naval Institute Press author?',
        a: (
          <>
            <p>Address letters in care of the Naval Institute and we will forward. Authors' telephone numbers, addresses, and emails are not released.</p>
            <p>Mail:</p>
            <p>[Naval Institute Author]<br />c/o Naval Institute Press<br />291 Wood Road<br />Annapolis, MD 21402.</p>
          </>
        ),
      },
      {
        q: 'I am interested in examining a Naval Institute Press book for a class I teach. Do you provide exam copies to professors and if so, how do I go about requesting an examination copy?',
        a: (
          <p>The Naval Institute Press features a wide range of history, foreign affairs and policy, national security, and leadership titles that have been adopted for course work by colleges and universities across the country. Naval Institute Press books are available as examination copies for course adoption at a cost of $6.00 per paperback copy and $10.00 per hardback copy to cover shipping and handling. There is a three book limit per semester. <a href="/books/about/examination-requests" className="text-link">Click </a><a href="/books/about/examination-requests" className="text-link">here</a> for more details on our policies.</p>
        ),
      },
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation',
    questions: [
      {
        q: 'Why does the U.S. Naval Institute need to raise funds?',
        a: (
          <>
            <p>Funds raised allow the U.S. Naval Institute to undertake necessary educational and preservation projects too costly to accomplish with operating funds alone. Because our traditional sources of income — membership dues, book sales, and advertising revenues — tend to fluctuate with the size of the defense community and economic swings beyond our control, it is prudent to seek additional avenues of support. Also, successful fundraising efforts will allow us to explore new ways to fulfill our mission and to strengthen our professional association.</p>
            <p>Make a <a href="/giving/donate" className="text-link">tax-deductible donation</a> today and help us continue to fulfill our important mission.</p>
          </>
        ),
      },
      {
        q: 'Does the U.S. Naval Institute receive government funds?',
        a: (
          <p>No. The U.S. Naval Institute has always been and pointedly remains independent from the military services or civilian defense contractors. This helps ensure the integrity of the open forum that has been the hallmark of the U.S. Naval Institute since 1873. We are a non-profit 501c(3) association.</p>
        ),
      },
      {
        q: 'How do I help the U.S. Naval Institute continue its crucial work of providing an independent forum for the professional exchange of ideas in support of the Sea Services?',
        a: (
          <>
            <p>In addition to <a href="/membership/join" className="text-link">joining the the U.S. Naval Institute</a><a href="/membership" className="text-link"> </a>and keeping your membership current, you can also make a <a href="/giving/donate" className="text-link">tax-deductible, charitable contribution</a> in support of critical Institute programs.</p>
            <p>To contact the Naval Institute Foundation:<br />Phone: 410-295-1054<br />Fax: 410-295-1050<br />Email: <a href="mailto:foundation@usni.org" className="text-link">foundation@usni.org</a></p>
          </>
        ),
      },
      {
        q: "What's the easiest way to donate stocks?",
        a: (
          <p>We will gladly provide our Merrill Lynch account number and DTC to prospective donors and assist in any way we can. For more information, please <a href="mailto:kmcalexander@usni.org" className="text-link">email</a> Kirk McAlexander or phone him at (410) 295-1054.</p>
        ),
      },
      {
        q: 'How could my company benefit from a partnership with the U.S. Naval Institute?',
        a: (
          <p>Become a year-round corporate sponsor. For more details on how your organization can benefit, contact the Naval Institute Foundation:<br />Phone 410-295-1054<br />Fax 410-295-1050<br />Email <a href="mailto:foundation@usni.org" className="text-link">foundation@usni.org</a></p>
        ),
      },
      {
        q: 'How do I make a tax-deductible donation?',
        a: (
          <p>Use the online contributions form <a href="/giving" className="text-link">here</a> or contact the Naval Institute Foundation.<br />Phone: 410-295-1054<br />Fax: 410-295-1050<br />Email: <a href="mailto:foundation@usni.org" className="text-link">foundation@usni.org</a></p>
        ),
      },
      {
        q: 'Does the Naval Institute Foundation offer grants or scholarships?',
        a: (
          <p>No. The Naval Institute Foundation does not make grants to individuals or other organizations. Its sole purpose is to raise money to support the U.S. Naval Institute's goals.</p>
        ),
      },
    ],
  },
]
