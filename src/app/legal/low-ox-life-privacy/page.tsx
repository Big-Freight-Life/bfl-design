import { Typography, Box } from '@mui/material';
import LegalDocLayout from '@/components/legal/LegalDocLayout';
import {
  LegalSection,
  LegalSubheading,
  LegalNotice,
  LegalTOC,
  LegalContactGrid,
} from '@/components/legal/LegalSection';

export default function LowOxLifePrivacyPage() {
  return (
    <LegalDocLayout
      productName="Low Ox Life"
      title="Privacy Policy"
      version="3.0"
      lastUpdated="February 7, 2026"
      effectiveDate="February 7, 2026"
      intro="Big Freight Life LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;), the developer of Low Ox Life, is committed to protecting your privacy and ensuring the security of your personal health information."
    >
      <LegalNotice>
        <Typography variant="body2">
          <strong>Data Controller:</strong>
          <br />
          Big Freight Life LLC
          <br />
          1351 N Buckner Blvd #180397
          <br />
          Dallas, TX 75218
          <br />
          United States
        </Typography>
      </LegalNotice>

      <LegalTOC
        items={[
          { id: 'information-collection', label: 'Information We Collect' },
          { id: 'use-of-information', label: 'How We Use Your Information' },
          { id: 'information-sharing', label: 'Information Sharing' },
          { id: 'data-security', label: 'Data Security' },
          { id: 'data-retention', label: 'Data Retention' },
          { id: 'cookies-tracking', label: 'Cookies & Tracking' },
          { id: 'children', label: "Children's Privacy (COPPA)" },
          { id: 'international-transfers', label: 'International Data Transfers' },
          { id: 'ccpa', label: 'California Privacy Rights (CCPA/CPRA)' },
          { id: 'gdpr', label: 'European Privacy Rights (GDPR)' },
          { id: 'your-rights', label: 'Your Data Rights' },
        ]}
      />

      {/* 1. Information We Collect */}
      <LegalSection id="information-collection" title="1. Information We Collect">
        <LegalSubheading>Personal Information</LegalSubheading>
        <Box component="ul">
          <li>Name</li>
          <li>Email address</li>
          <li>Date of birth</li>
          <li>Profile photo</li>
          <li>Timezone and location preferences</li>
        </Box>

        <LegalSubheading>Health Information</LegalSubheading>
        <Box component="ul">
          <li>Dietary logs and food tracking</li>
          <li>Symptom tracking data</li>
          <li>Apple HealthKit data (with your explicit consent)</li>
        </Box>

        <LegalSubheading>Usage Information</LegalSubheading>
        <Box component="ul">
          <li>App interaction and feature usage</li>
          <li>Device information</li>
          <li>Crash reports and diagnostic data</li>
        </Box>
      </LegalSection>

      {/* 2. How We Use Your Information */}
      <LegalSection id="use-of-information" title="2. How We Use Your Information">
        <LegalSubheading>Service Provision</LegalSubheading>
        <Box component="ul">
          <li>Personalized oxalate tracking and dietary management</li>
          <li>Health insights and pattern analysis</li>
          <li>Reminders and notifications</li>
          <li>Cross-device data synchronization</li>
        </Box>

        <LegalSubheading>AI Processing</LegalSubheading>
        <Box component="ul">
          <li>File and document analysis</li>
          <li>Personalized insights for Elite tier subscribers</li>
          <li>Secure processing through our AI service providers</li>
        </Box>

        <LegalSubheading>Service Improvement</LegalSubheading>
        <Box component="ul">
          <li>Feature enhancement and development</li>
          <li>Anonymized pattern analysis</li>
          <li>Bug fixing and debugging</li>
        </Box>
      </LegalSection>

      {/* 3. Information Sharing */}
      <LegalSection id="information-sharing" title="3. Information Sharing">
        <LegalNotice>
          <Typography variant="body2">
            <strong>We do not sell your personal information.</strong>
          </Typography>
        </LegalNotice>

        <LegalSubheading>Limited Sharing</LegalSubheading>
        <Typography variant="body1">
          We may share your information only in the following circumstances:
        </Typography>
        <Box component="ul">
          <li>
            <strong>With your explicit consent</strong>
          </li>
          <li>
            <strong>Legal obligations:</strong> When required by law or legal process
          </li>
          <li>
            <strong>Service providers:</strong> Third parties who help us operate the app
          </li>
          <li>
            <strong>Anonymized research:</strong> Aggregated, de-identified data (opt-in only)
          </li>
        </Box>

        <LegalSubheading>Third-Party Services</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Apple Health:</strong> HealthKit integration (with your authorization)
          </li>
          <li>
            <strong>Supabase:</strong> Secure database hosting and authentication
          </li>
          <li>
            <strong>Stripe:</strong> Payment processing (we do not store payment details)
          </li>
        </Box>
      </LegalSection>

      {/* 4. Data Security */}
      <LegalSection id="data-security" title="4. Data Security">
        <LegalSubheading>Technical Measures</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Encryption at rest:</strong> AES-256 encryption for stored data
          </li>
          <li>
            <strong>Encryption in transit:</strong> TLS 1.3 for all data transmission
          </li>
          <li>
            <strong>Security audits:</strong> Regular security assessments and testing
          </li>
          <li>
            <strong>Key management:</strong> Secure cryptographic key handling
          </li>
        </Box>

        <LegalSubheading>Access Controls</LegalSubheading>
        <Box component="ul">
          <li>Multi-factor authentication (MFA) available for your account</li>
          <li>Role-based access controls for our team</li>
          <li>Regular access reviews and monitoring</li>
        </Box>
      </LegalSection>

      {/* 5. Data Retention */}
      <LegalSection id="data-retention" title="5. Data Retention">
        <LegalSubheading>Active Accounts</LegalSubheading>
        <Box component="ul">
          <li>Data retained while your account is active</li>
          <li>Health logs retained for trend analysis and insights</li>
          <li>Deleted items retained for 30 days before permanent removal</li>
        </Box>

        <LegalSubheading>Inactive Accounts</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>12 months:</strong> Inactivity reminder sent
          </li>
          <li>
            <strong>18 months:</strong> Account archived
          </li>
          <li>
            <strong>24 months:</strong> Data permanently deleted
          </li>
        </Box>
      </LegalSection>

      {/* 6. Cookies & Tracking */}
      <LegalSection id="cookies-tracking" title="6. Cookies & Tracking">
        <LegalSubheading>Essential Cookies Only</LegalSubheading>
        <Box component="ul">
          <li>Authentication tokens</li>
          <li>User preferences</li>
          <li>Session management</li>
        </Box>

        <LegalSubheading>What We Don&apos;t Do</LegalSubheading>
        <Box component="ul">
          <li>No third-party advertising cookies</li>
          <li>No cross-site tracking</li>
          <li>No behavioral advertising</li>
        </Box>
      </LegalSection>

      {/* 7. Children's Privacy (COPPA) */}
      <LegalSection id="children" title="7. Children&rsquo;s Privacy (COPPA)">
        <LegalSubheading>Age Requirements</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Minimum age:</strong> 13 years old
          </li>
          <li>
            <strong>Ages 13-17:</strong> Parental or guardian consent required
          </li>
          <li>
            <strong>Under 13:</strong> Not permitted to use the app
          </li>
        </Box>

        <LegalSubheading>Age Verification</LegalSubheading>
        <Box component="ul">
          <li>Date of birth collected during signup</li>
          <li>Users under 13 are blocked from registration</li>
        </Box>

        <LegalSubheading>Parental Consent Process</LegalSubheading>
        <Box component="ul">
          <li>Verification email sent to parent or guardian</li>
          <li>Consent must be confirmed before account activation</li>
        </Box>

        <LegalSubheading>Parental Rights</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Review:</strong> Request to see your child&apos;s data
          </li>
          <li>
            <strong>Delete:</strong> Request deletion of your child&apos;s data
          </li>
          <li>
            <strong>Refuse:</strong> Decline further data collection
          </li>
          <li>
            <strong>Opt-out:</strong> Remove your child from the service
          </li>
          <li>
            <strong>Access:</strong> Obtain a copy of collected data
          </li>
        </Box>

        <LegalSubheading>Enhanced Privacy for Minors</LegalSubheading>
        <Box component="ul">
          <li>Additional privacy protections for users under 18</li>
          <li>No targeted advertising for users under 18</li>
        </Box>

        <LegalNotice>
          <Typography variant="body2">
            <strong>COPPA Requests:</strong> Email{' '}
            <a href="mailto:privacy@bflux.co">privacy@bflux.co</a> with subject line
            &ldquo;COPPA Request&rdquo;
          </Typography>
        </LegalNotice>
      </LegalSection>

      {/* 8. International Data Transfers */}
      <LegalSection id="international-transfers" title="8. International Data Transfers">
        <Box component="ul">
          <li>
            <strong>Primary servers:</strong> Located in the United States
          </li>
          <li>
            <strong>EU user data:</strong> Stored in EU regions where applicable
          </li>
          <li>
            <strong>Transfer safeguards:</strong> Standard Contractual Clauses (SCCs) for
            international transfers
          </li>
        </Box>
      </LegalSection>

      {/* 9. California Privacy Rights (CCPA/CPRA) */}
      <LegalSection id="ccpa" title="9. California Privacy Rights (CCPA/CPRA)">
        <LegalSubheading>Your Rights Under California Law</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Right to Know:</strong> What personal information we collect and how it&apos;s
            used
          </li>
          <li>
            <strong>Right to Delete:</strong> Request deletion of your personal information
          </li>
          <li>
            <strong>Right to Correct:</strong> Request correction of inaccurate information
          </li>
          <li>
            <strong>Right to Opt-Out:</strong> Opt-out of sale or sharing of personal information
          </li>
          <li>
            <strong>Right to Limit:</strong> Limit use of sensitive personal information
          </li>
          <li>
            <strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices
          </li>
        </Box>

        <LegalSubheading>Categories of Information Collected</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Identifiers:</strong> Name, email, device identifiers
          </li>
          <li>
            <strong>Commercial Information:</strong> Subscription and purchase history
          </li>
          <li>
            <strong>Health Information:</strong> Dietary logs, symptom data
          </li>
          <li>
            <strong>Internet Activity:</strong> App usage and interaction data
          </li>
          <li>
            <strong>Geolocation:</strong> Timezone and location preferences
          </li>
          <li>
            <strong>Inferences:</strong> Health patterns and dietary insights
          </li>
          <li>
            <strong>Sensitive Personal Information:</strong> Health data (with consent)
          </li>
        </Box>

        <LegalNotice>
          <Typography variant="body2">
            <strong>Important:</strong> We do not sell personal information and do not share personal
            information for cross-context behavioral advertising.
          </Typography>
        </LegalNotice>

        <LegalSubheading>How to Exercise Your Rights</LegalSubheading>
        <Box component="ul">
          <li>
            Email: <a href="mailto:privacy@bflux.co">privacy@bflux.co</a>
          </li>
          <li>Subject line: &ldquo;CCPA Request&rdquo;</li>
          <li>Response time: 45 days</li>
        </Box>
      </LegalSection>

      {/* 10. European Privacy Rights (GDPR) */}
      <LegalSection id="gdpr" title="10. European Privacy Rights (GDPR)">
        <LegalSubheading>Legal Basis for Processing</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Consent:</strong> For health data and optional features
          </li>
          <li>
            <strong>Contract:</strong> To provide the services you&apos;ve requested
          </li>
          <li>
            <strong>Legitimate Interests:</strong> For security, fraud prevention, and service
            improvement
          </li>
        </Box>

        <LegalSubheading>Additional Rights for EU/EEA Users</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Right to Lodge a Complaint:</strong> With your local data protection authority
          </li>
          <li>
            <strong>Right to Withdraw Consent:</strong> At any time, without affecting prior
            processing
          </li>
          <li>
            <strong>Right to Transparency:</strong> Clear information about data processing
          </li>
        </Box>
      </LegalSection>

      {/* 11. Your Data Rights */}
      <LegalSection id="your-rights" title="11. Your Data Rights">
        <LegalSubheading>Rights Available to All Users</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Access:</strong> Request a copy of your personal data
          </li>
          <li>
            <strong>Rectification:</strong> Correct inaccurate or incomplete data
          </li>
          <li>
            <strong>Erasure:</strong> Request deletion of your data (&ldquo;right to be
            forgotten&rdquo;)
          </li>
          <li>
            <strong>Portability:</strong> Receive your data in a portable format
          </li>
          <li>
            <strong>Object:</strong> Object to certain types of processing
          </li>
          <li>
            <strong>Restrict:</strong> Limit how we process your data
          </li>
        </Box>

        <LegalSubheading>How to Exercise Your Rights</LegalSubheading>
        <Box component="ul">
          <li>
            <strong>Support Portal:</strong>{' '}
            <a
              href="https://bflux.co/support/low-ox-life/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bflux.co/support/low-ox-life/
            </a>
          </li>
          <li>
            <strong>Response Time:</strong> Within 30 days
          </li>
        </Box>
      </LegalSection>

      {/* Contact */}
      <LegalSection id="contact" title="Contact Us">
        <LegalContactGrid
          items={[
            {
              label: 'Support Portal',
              content: (
                <a
                  href="https://bflux.co/support/low-ox-life/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  bflux.co/support/low-ox-life/
                </a>
              ),
            },
            {
              label: 'Privacy Inquiries',
              content: <a href="mailto:privacy@bflux.co">privacy@bflux.co</a>,
            },
            {
              label: 'Mailing Address',
              content: (
                <>
                  Big Freight Life LLC
                  <br />
                  1351 N Buckner Blvd #180397
                  <br />
                  Dallas, TX 75218, USA
                </>
              ),
            },
          ]}
        />
      </LegalSection>
    </LegalDocLayout>
  );
}
