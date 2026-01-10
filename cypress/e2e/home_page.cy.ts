const prevYear = new Date().getFullYear() - 1;

const futureDate = new Date();
futureDate.setFullYear(prevYear + 1);

const futureYear = futureDate.toUTCString();

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });
});

describe('Server Status', () => {
  it('shows server error icon when health check fails', () => {
    cy.intercept('GET', '**/healthz', {
      statusCode: 500,
      body: 'Server Error',
    }).as('healthCheckFail');

    cy.visit('/');
    cy.wait('@healthCheckFail');
    cy.get('[data-cy="server-error"]').should('be.visible');
  });

  it('does not show server error icon when health check passes', () => {
    cy.intercept('GET', '**/healthz', {
      statusCode: 200,
      body: 'OK',
    }).as('healthCheckPass');

    cy.visit('/');
    cy.wait('@healthCheckPass');
    cy.get('[data-cy="server-error"]').should('not.exist');
  });
});

describe('Next Event', () => {
  it('shows next event component when data is available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Race Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'conventional',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSuccess');

    cy.visit('/');
    cy.wait('@getNextEventSuccess');
    cy.get('[data-cy="next-event-name"]')
      .contains('Race Event')
      .should('be.visible');
  });

  it('does not show next event component when no data is available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [],
            },
          },
        });
      }
    }).as('getNextEventEmpty');

    cy.visit('/');
    cy.wait('@getNextEventEmpty');
    cy.get('[data-cy="next-event-name"]').should('not.exist');
  });

  it('shows event badge for sprint sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Sprint Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="sprint-badge-long"]').should('be.visible');
  });

  it('shows event badge for sprint qualifying sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Sprint Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint_qualifying',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="sprint-badge-long"]').should('be.visible');
  });

  it('shows event badge for sprint shootout sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Sprint Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'sprint_shootout',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventSprint');

    cy.visit('/');
    cy.wait('@getNextEventSprint');
    cy.get('[data-cy="sprint-badge-long"]').should('be.visible');
  });

  it('does not show event badge for race or qualifying sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Race or Qualifying Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'conventional',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventRace');

    cy.visit('/');
    cy.wait('@getNextEventRace');
    cy.get('[data-cy="sprint-badge-long"]').should('not.exist');
  });

  it('does not show event badge for test sessions', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: prevYear,
                  event_name: 'Test Event',
                  location: 'Location',
                  country: 'Country',
                  event_format: 'testing',
                  session5_date_utc: futureYear,
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventRace');

    cy.visit('/');
    cy.wait('@getNextEventRace');
    cy.get('[data-cy="sprint-badge-long"]').should('not.exist');
  });

  it('does not show next event component when event is in the past', () => {
    // Set a date in the past for session5_date_utc
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1); // Set to last year

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: pastDate.getFullYear(),
                  event_name: 'Past Event',
                  location: 'Old Location',
                  country: 'Old Country',
                  event_format: 'conventional',
                  session5_date_utc: pastDate.toISOString(),
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventPast');

    cy.visit('/');
    cy.wait('@getNextEventPast');
    cy.get('[data-cy="next-event-name"]').should('not.exist');
  });
});

describe('Countdown Timer', () => {
  it('shows countdown timer when a future event is available', () => {
    // Set a target date a few days in the future for the countdown
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5); // 5 days from now
    futureDate.setHours(futureDate.getHours() + 10); // 10 hours from now
    futureDate.setMinutes(futureDate.getMinutes() + 30); // 30 minutes from now

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: 2024,
                  event_name: 'Future Event',
                  location: 'Future Location',
                  country: 'Future Country',
                  event_format: 'conventional',
                  session5_date_utc: futureDate.toISOString(),
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventFuture');

    cy.visit('/');
    cy.wait('@getNextEventFuture');

    // Assert that the countdown digits are visible and contain plausible values
    cy.get('[data-cy="countdown-timer"]').should('be.visible'); // The container for the digits

    // Check for days, hours, minutes, seconds digits
    cy.get('[data-cy="countdown-digit-day"]')
      .find('[data-cy="countdown-value"]')
      .should('be.visible')
      .invoke('text')
      .then(parseInt)
      .should('be.gte', 0); // Days
    cy.get('[data-cy="countdown-digit-hour"]')
      .find('[data-cy="countdown-value"]')
      .should('be.visible')
      .invoke('text')
      .then(parseInt)
      .should('be.gte', 0); // Hours
    cy.get('[data-cy="countdown-digit-minute"]')
      .find('[data-cy="countdown-value"]')
      .should('be.visible')
      .invoke('text')
      .then(parseInt)
      .should('be.gte', 0); // Minutes
    cy.get('[data-cy="countdown-digit-second"]')
      .find('[data-cy="countdown-value"]')
      .should('be.visible')
      .invoke('text')
      .then(parseInt)
      .should('be.gte', 0); // Seconds
  });

  it('does not show countdown timer when no future event is available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [],
            },
          },
        });
      }
    }).as('getNextEventEmpty');

    cy.visit('/');
    cy.wait('@getNextEventEmpty');
    cy.get('[data-cy="countdown-timer"]').should('not.exist');
  });

  it('does not show countdown timer when event is in the past', () => {
    // Set a date in the past for session5_date_utc
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1); // Set to last year

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetNextEvent') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              schedule: [
                {
                  year: pastDate.getFullYear(),
                  event_name: 'Past Event',
                  location: 'Old Location',
                  country: 'Old Country',
                  event_format: 'conventional',
                  session5_date_utc: pastDate.toISOString(),
                },
              ],
            },
          },
        });
      }
    }).as('getNextEventPast');

    cy.visit('/');
    cy.wait('@getNextEventPast');
    cy.get('[data-cy="countdown-timer"]').should('not.exist');
  });
});

describe('Top Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to Standings page', () => {
    cy.get('[data-cy="nav-link-standings"]').click();
    cy.url().should('include', `/${prevYear}/standings`);
  });

  it('navigates to Map page', () => {
    cy.get('[data-cy="nav-link-map"]').click();
    cy.url().should('include', `/${prevYear}/map`);
  });
});

describe('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens Terms of Service dialog', () => {
    cy.contains('Terms of Service').click();
    cy.contains('Terms and Conditions').should('be.visible');
    cy.get('[data-cy="dialog-close-toc"]').contains('Close').click();
    cy.contains('Terms and Conditions').should('not.exist');
  });

  it('opens About Us dialog', () => {
    cy.contains('About Us').click();
    cy.contains('About Slick Telemetry').should('be.visible');
    cy.get('[data-cy="dialog-close-about-us"]').contains('Close').click();
    cy.contains('About Slick Telemetry').should('not.exist');
  });

  it('has correct GitHub link', () => {
    cy.get('a[href*="https://github.com/SlickTelemetry"]').should(
      'have.attr',
      'target',
      '_blank',
    );
    cy.get('a[href*="https://github.com/SlickTelemetry"]').should(
      'have.attr',
      'rel',
      'noreferrer',
    );
  });

  it('has correct mailto link', () => {
    cy.get('a[href*="mailto:contact@slicktelemetry.com"]').should(
      'have.attr',
      'href',
      'mailto:contact@slicktelemetry.com',
    );
  });

  it('displays correct application version', () => {
    cy.readFile('VERSION').then((version) => {
      cy.get('[data-cy="app-version"]')
        .should('be.visible')
        .contains(`v${version.trim()}`);
    });
  });
});

describe('Background Image', () => {
  it('successfully loads the background image', () => {
    cy.request('/slick-telemetry-bg.png').its('status').should('eq', 200);
  });
});
