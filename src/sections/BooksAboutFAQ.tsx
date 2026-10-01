import { useState, type ReactNode } from 'react'

/**
 * Naval Institute Press FAQs, in the accordion treatment DonateFAQ and
 * ArchivesFAQ use — square navy chevron, the shared `.accordion-row` hover band,
 * and the heading + "View All" button in the left column.
 *
 * Questions and answers are the sixteen the live /press/about page lists, in
 * its order and wording. Answers are JSX rather than strings because the live
 * copy carries links, a mailing address, a bulleted list, and bold type.
 */
const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'How do I find out more about submitting a book manuscript?',
    a: (
      <p>
        Please refer to our detailed{' '}
        <a href="/books/about/writing" className="text-link">
          book manuscript submission guidelines
        </a>
        .
      </p>
    ),
  },
  {
    q: 'How do I contact a Naval Institute Press author?',
    a: (
      <>
        <p>
          Address letters in care of the Naval Institute and we will forward.
          Authors' telephone numbers, addresses, and emails are not released.
        </p>
        <p>Mail:</p>
        <p>
          [Naval Institute Author]
          <br />
          c/o Naval Institute Press
          <br />
          291 Wood Road
          <br />
          Annapolis, MD 21402.
        </p>
      </>
    ),
  },
  {
    q: 'I am interested in examining a Naval Institute Press book for a class I teach. Do you provide exam copies to professors and if so, how do I go about requesting an examination copy?',
    a: (
      <p>
        The Naval Institute Press features a wide range of history, foreign affairs
        and policy, national security, and leadership titles that have been adopted
        for course work by colleges and universities across the country. Naval
        Institute Press books are available as examination copies for course
        adoption at a cost of $6.00 per paperback copy and $10.00 per hardback copy
        to cover shipping and handling. There is a three book limit per semester.{' '}
        <a href="/books/about/examination-requests" className="text-link">
          Click here
        </a>{' '}
        for more details on our policies.
      </p>
    ),
  },
  {
    q: 'Will I receive confirmation of my order?',
    a: (
      <>
        <p>
          Onscreen confirmation of each order placed through our secure server is
          provided. It may take up to 30 seconds (depending on the amount of traffic
          on our server, the level of Internet congestion in general, and the speed
          of your Internet connection) for the confirmation screen to appear. If you
          hit the back button of your browser before the confirmation screen
          appears, the confirmation screen will not load in your browser. This has
          no effect, however, on the ordering process itself. Once you submit an
          order it is immediately sent to us.
        </p>
        <p>
          You can print your confirmation page and keep it for your records or
          future reference. If you have any questions about whether your order was
          received, please contact our{' '}
          <a href="mailto:customer@usni.org" className="text-link">
            Customer Service Department
          </a>
          .
        </p>
      </>
    ),
  },
  {
    q: 'Can I save my shopping cart and continue shopping later?',
    a: (
      <p>
        Your shopping cart is automatically saved whenever you add products or make
        changes. This feature enables you to leave the site and return to your cart
        at a later time to finish your order. Please note you must be logged in and
        have cookies enabled in your browser for this to work.
      </p>
    ),
  },
  {
    q: 'What is your return policy on books?',
    a: (
      <>
        <p>
          If you are not pleased with your book purchase, you may return it in
          saleable condition (no rips, tears, stains, folded pages) within 60 days of
          receipt for an exchange or full refund, less shipping and handling fees,
          to:
        </p>
        <p className="pl-6">
          Returns: Naval Institute Press 20AS162
          <br />
          c/o Ingram Publisher Services
          <br />
          191 Edwards Dr.
          <br />
          Jackson, TN 38301
          <br />
          United States
        </p>
        <p>
          Refunds will be given or credited on the payment method of the order;
          payment by credit card will be refunded to that card, and if the payment is
          by check a check shall be issued in return.
        </p>
        <p>
          Returns must have a copy of the original packing list. If one is not
          available, please contact Member Services at 1-800-233-8764 or by email at{' '}
          <a href="mailto:customer@usni.org" className="text-link">
            customer@usni.org
          </a>
          . Customers outside of the U.S. may contact us at 1-410-268-6110.
        </p>
        <p>
          If it is determined that the return is necessary due to an error on the
          part of the U.S. Naval Institute, shipping and handling fees will be
          refunded.
        </p>
        <p>The time period for processing a return is as follows:</p>
        <ul className="list-disc pl-6 flex flex-col gap-1">
          <li>5 to 10 business days for U.S. Naval Institute to receive the return</li>
          <li>5 to 7 business days for U.S. Naval Institute to process the return</li>
        </ul>
      </>
    ),
  },
  {
    q: 'What if I have a rush order?',
    a: (
      <p>
        For same-day shipping via UPS (Ground, Two-Day, Next Day Air), orders must be
        placed by 12:00 PM EST/EDT.
      </p>
    ),
  },
  {
    q: 'If I live overseas, am I responsible for paying import VAT or duties on my book orders?',
    a: (
      <p>
        <strong>
          YES! Buyers with non-US addresses are responsible for paying any Import VAT
          and Duties. This will need to be paid directly to the courier before the
          courier can complete the delivery.
        </strong>
      </p>
    ),
  },
  {
    q: 'Are all Naval Institute Press titles available in eBook form?',
    a: <p>No. Naval Institute Press is only making select titles available in eBook form.</p>,
  },
  {
    q: 'Can I buy an eBook directly from the U.S. Naval Institute website?',
    a: (
      <p>
        No. eBooks published by Naval Institute Press are only available through our
        eRetail partners.
      </p>
    ),
  },
  {
    q: 'Does my member discount apply when purchasing Naval Institute Press eBooks?',
    a: (
      <p>
        No. Because eBooks are purchased through our eRetail partners, not directly
        from Naval Institute Press, your member discount is not applicable. Each of
        our eRetail partners, however, does discount the price of each title. See the
        specific vendor site of your choice for detailed pricing information for each
        title.
      </p>
    ),
  },
  {
    q: 'Where are Naval Institute Press eBooks sold?',
    a: (
      <>
        <p>
          <strong>
            <a href="https://bit.ly/gd6cIC" className="text-link">
              Amazon Kindle Store
            </a>
          </strong>
        </p>
        <p>
          <strong>
            <a href="https://itunes.apple.com/us/genre/books/id38?mt=11" className="text-link">
              Apple iBooks for iPad and iPhone
            </a>
          </strong>
        </p>
        <p>
          <strong>
            <a href="https://www.barnesandnoble.com/b/nook-books/_/N-8qa" className="text-link">
              Barnes &amp; Noble Nook Store
            </a>
          </strong>
        </p>
        <p>
          <strong>
            <a href="https://play.google.com/store/books?hl=en" className="text-link">
              Google Play
            </a>
          </strong>
        </p>
      </>
    ),
  },
  {
    q: 'Can I read eBooks on my portable device?',
    a: (
      <>
        <p>
          Yes. Please click on the link to your preferred reading device below and
          follow the instructions.
        </p>
        <p>Get a reader for your device:</p>
        <p>
          <a href="https://www.amazon.com/kindle-dbs/fd/kcp" className="text-link">
            Amazon Kindle Reader
          </a>
        </p>
        <p>
          <a href="https://www.apple.com/ibooks/" className="text-link">
            Apple iBooks
          </a>
        </p>
        <p>
          <a
            href="https://nook.barnesandnoble.com/u/nook-reading-app/379003593"
            className="text-link"
          >
            Barnes &amp; Noble Nook Reader
          </a>
        </p>
        <p>
          <a
            href="https://support.google.com/googleplay/answer/4517692?p=books_devices&hl=en&visit_id=1-636627966301183537-2263515927&rd=2"
            className="text-link"
          >
            Google Play
          </a>
        </p>
      </>
    ),
  },
  {
    q: 'Can I purchase an eBook as a gift?',
    a: (
      <p>
        Yes. Each of our retail partners provides instructions on how to give the gift
        of an eBook to a family member or friend.
      </p>
    ),
  },
  {
    q: 'Who do I contact if there is a problem with my eBook purchase?',
    a: (
      <p>
        For members and customers who encounter a problem with their eBook, please
        contact the retailer from whom the eBook was purchased. For example, if you
        experience a problem with a Naval Institute Press title for your Kindle,
        please contact Amazon directly.
      </p>
    ),
  },
  {
    q: 'Other eBook Questions?',
    a: (
      <p>
        For all other Book related inquiries, please email{' '}
        <a href="mailto:trade@usni.org" className="text-link">
          trade@usni.org
        </a>
        .
      </p>
    ),
  },
]

function FAQItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-border-light last:border-b-0 transition-colors ${open ? 'bg-white' : ''}`}>
      <button
        className="accordion-row flex items-center justify-between w-full py-4 px-4 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-base text-navy-bolder">{q}</span>
        <span className={`accordion-chevron flex-shrink-0 w-8 h-8 bg-navy-bolder text-white flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="pt-4 pb-5 pl-4 pr-16 flex flex-col gap-4 font-body text-base text-neutral-subtle leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function BooksAboutFAQ() {
  return (
    <section id="faq" className="py-16 lg:py-20 bg-surface-subtle">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16">

          {/* Left */}
          <div>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1] mb-6">
              Frequently Asked Questions
            </h2>
            <a
              href="/faq"
              className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-navy-bright transition-colors"
            >
              View All Frequently Asked Questions
            </a>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-border-light">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
