export const AboutUs = () => (
  <div className='[&_a]:underline [&_h2]:font-black [&_h3]:font-bold [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-4'>
    <h2>About Us</h2>
    <p>
      Welcome to Slick Telemetry. We are a team of passionate individuals who
      are dedicated to providing a comprehensive data analytics platform for
      Formula 1.
    </p>

    <h3>Our Project</h3>
    <p>
      Slick Telemetry is a data analytics platform for Formula 1. It provides a
      comprehensive view of the data from the cars, drivers and teams.
    </p>

    <p>
      Built with{' '}
      <a href='https://tanstack.com/' target='_blank' rel='noreferrer'>
        TanStack
      </a>
      . Powered by{' '}
      <a
        href='https://github.com/theOehrly/Fast-F1'
        target='_blank'
        rel='noreferrer'
      >
        FastF1
      </a>
      ,{' '}
      <a
        href='https://github.com/jolpica/jolpica-f1'
        target='_blank'
        rel='noreferrer'
      >
        Jolpica F1
      </a>{' '}
      and{' '}
      <a href='https://graphql.org' target='_blank' rel='noreferrer'>
        GraphQL
      </a>
      .
    </p>

    <p>
      We hope you find our site useful! If you have any questions or feedback,
      please feel free to contact us at{' '}
      <a href='mailto:contact@slicktelemetry.com'>contact@slicktelemetry.com</a>
      .
    </p>
  </div>
);
