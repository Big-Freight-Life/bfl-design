import { Typography, Box } from '@mui/material';
import LegalDocLayout from '@/components/legal/LegalDocLayout';
import {
  LegalSection,
  LegalSubheading,
  LegalNotice,
  LegalTOC,
  LegalContactGrid,
} from '@/components/legal/LegalSection';

export default function UrinePrivacyPage() {
  return (
    <LegalDocLayout
      productName="24H Urine Analysis"
      title="Privacy Policy"
      version="1.0"
      lastUpdated="March 15, 2026"
      effectiveDate="March 15, 2026"
      intro="This privacy policy describes how 24H Urine Analysis (&quot;the App&quot;) collects, uses, and protects your personal information. By using the App, you agree to the practices described in this policy."
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
          { id: 'data-collection', label: 'Data We Collect' },
          { id: 'how-we-collect', label: 'How We Collect Data' },
          { id: 'third-party-services', label: 'Third-Party Services' },
          { id: 'data-storage', label: 'Data Storage and Retention' },
          { id: 'your-rights', label: 'Your Rights' },
          { id: 'camera-usage', label: 'Camera and Photo Library Usage' },
          { id: 'analytics', label: 'Analytics and Advertising' },
          { id: 'hipaa', label: 'Medical and HIPAA Disclaimer' },
          { id: 'washington-mhmda', label: 'Washington My Health My Data Act' },
          { id: 'ftc-breach', label: 'FTC Health Breach Notification' },
          { id: 'california-ccpa', label: 'California Consumer Privacy Act (CCPA/CPRA)' },
          { id: 'encrypted-cloud', label: 'Encrypted Cloud Storage' },
          { id: 'children', label: "Children's Privacy" },
          { id: 'changes', label: 'Changes to This Policy' },
        ]}
      />

      {/* 1. Data We Collect */}
      <LegalSection id="data-collection" title="1. Data We Collect">
        <Typography variant="body1">
          The App collects and processes the following types of data:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Urine test results:</strong> Values captured via camera scanning, photo upload, or manual entry from 24-hour urine analysis lab reports.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Health insights and recommendations:</strong> AI-generated interpretations of your test results, including trend analysis over time.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>User preferences:</strong> Display settings, notification preferences, privacy choices, and data retention selections.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Photos and camera data:</strong> Images of lab reports captured or selected for scanning purposes. These images are processed for text extraction and are not stored permanently unless you choose to save them.
            </Typography>
          </li>
        </Box>
      </LegalSection>

      {/* 2. How We Collect Data */}
      <LegalSection id="how-we-collect" title="2. How We Collect Data">
        <Typography variant="body1">
          Data is collected through your direct interaction with the App:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Camera scanning:</strong> You can use your device camera to capture images of lab reports for automated data extraction.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Photo library:</strong> You can select existing photos of lab reports from your device photo library.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Manual entry:</strong> You can manually input test result values.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>App settings:</strong> Your preferences are saved locally and synced to your account.
            </Typography>
          </li>
        </Box>
      </LegalSection>

      {/* 3. Third-Party Services */}
      <LegalSection id="third-party-services" title="3. Third-Party Services">
        <Typography variant="body1">
          The App uses the following third-party services to provide its functionality:
        </Typography>

        <LegalSubheading>Google Gemini API (via Vertex AI)</LegalSubheading>
        <Typography variant="body1">
          Your test result data (extracted text from lab reports) is sent to the Google Gemini API for AI-powered analysis. This service generates health insights, interpretations, and recommendations based on your lab values. Google&apos;s privacy policy governs how they handle data received through their API. No images are sent to this service &mdash; only extracted text data. All personal identifying information (PII) is removed on your device before any data is transmitted.
        </Typography>

        <LegalSubheading>Convex</LegalSubheading>
        <Typography variant="body1">
          Convex serves as the App&apos;s backend for data storage and synchronization. Your test results, health insights, and user preferences are stored on Convex servers to enable syncing across your devices. Convex&apos;s privacy policy governs their data handling practices.
        </Typography>
      </LegalSection>

      {/* 4. Data Storage and Retention */}
      <LegalSection id="data-storage" title="4. Data Storage and Retention">
        <Typography variant="body1">
          Your data is stored securely on Convex servers and locally on your device. You control how long your data is retained through the Data Retention setting in the App&apos;s Privacy settings:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>6 months:</strong> Data older than 6 months is automatically deleted.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>1 year:</strong> Data older than 1 year is automatically deleted.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>2 years:</strong> Data older than 2 years is automatically deleted.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Indefinite:</strong> Data is retained until you manually delete it or delete your account.
            </Typography>
          </li>
        </Box>
        <Typography variant="body1">
          You can change your data retention preference at any time in Settings &gt; Privacy &gt; Data Retention.
        </Typography>
      </LegalSection>

      {/* 5. Your Rights */}
      <LegalSection id="your-rights" title="5. Your Rights">
        <Typography variant="body1">
          You have the following rights regarding your data:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Access:</strong> You can view all data the App has collected about you within the App.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Export:</strong> You can export your test results and data using the Export Results feature in Settings.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Deletion:</strong> You can delete individual test results or request complete account and data deletion. To delete your account and all associated data, use the in-app account deletion feature or contact us at the email address below.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Consent withdrawal:</strong> You can stop using the App at any time. You can also adjust sharing preferences in Settings &gt; Privacy.
            </Typography>
          </li>
        </Box>
      </LegalSection>

      {/* 6. Camera and Photo Library Usage */}
      <LegalSection id="camera-usage" title="6. Camera and Photo Library Usage">
        <Typography variant="body1">
          The App requests access to your device camera and photo library solely for the purpose of capturing or selecting images of lab reports for data extraction. These permissions are optional &mdash; you can use manual entry instead. Camera and photo access is never used for any other purpose, and images are processed on-device for text extraction before any data is transmitted to third-party services.
        </Typography>
      </LegalSection>

      {/* 7. Analytics and Advertising */}
      <LegalSection id="analytics" title="7. Analytics and Advertising">
        <Typography variant="body1">
          The App does not use any analytics SDKs or tracking frameworks. The App does not display advertisements. We do not sell, rent, or share your personal data with third parties for marketing or advertising purposes. Your health data is used exclusively to provide the App&apos;s core functionality.
        </Typography>
      </LegalSection>

      {/* 8. Medical and HIPAA Disclaimer */}
      <LegalSection id="hipaa" title="8. Medical and HIPAA Disclaimer">
        <LegalNotice warning>
          <Typography variant="body2">
            <strong>This App is NOT HIPAA compliant</strong> and is not intended to serve as a medical device or a substitute for professional medical advice, diagnosis, or treatment.
          </Typography>
        </LegalNotice>
        <Typography variant="body1">
          The AI-generated health insights and recommendations provided by the App are for educational and informational purposes only. Always consult a qualified healthcare provider before making any medical decisions based on information from this App.
        </Typography>
        <Typography variant="body1">
          Do not use this App for emergency medical situations. If you are experiencing a medical emergency, call your local emergency services immediately.
        </Typography>
      </LegalSection>

      {/* 9. Washington My Health My Data Act */}
      <LegalSection id="washington-mhmda" title="9. Washington My Health My Data Act (MHMDA)">
        <Typography variant="body1">
          If you are a Washington State resident, the following applies to you under the My Health My Data Act (RCW 19.373):
        </Typography>

        <LegalSubheading>Health Data We Collect</LegalSubheading>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              Lab test values extracted from scanned urine analysis reports
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              AI-generated health insights, risk assessments, and recommendations
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Health-related preferences and settings
            </Typography>
          </li>
        </Box>

        <LegalSubheading>Purposes</LegalSubheading>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              Providing AI-powered analysis of your lab test results
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Generating personalized health insights and recommendations
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Tracking trends in your test results over time
            </Typography>
          </li>
        </Box>

        <LegalSubheading>Third Parties</LegalSubheading>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Google Vertex AI:</strong> Receives de-identified lab text for analysis
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Convex:</strong> Stores encrypted data for cloud sync
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              We do not sell your health data to any third party
            </Typography>
          </li>
        </Box>

        <LegalSubheading>Your Rights Under MHMDA</LegalSubheading>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              Right to confirm whether we are collecting or sharing your health data
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Right to access your health data
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Right to withdraw consent for collection and sharing
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Right to request deletion of your health data
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              Right to be free from discrimination for exercising your rights
            </Typography>
          </li>
        </Box>

        <Typography variant="body1">
          To exercise these rights, contact us at{' '}
          <a href="mailto:privacy@24hurineanalysis.com">privacy@24hurineanalysis.com</a>{' '}
          or use the in-app account deletion feature in Settings.
        </Typography>
      </LegalSection>

      {/* 10. FTC Health Breach Notification */}
      <LegalSection id="ftc-breach" title="10. FTC Health Breach Notification">
        <Typography variant="body1">
          In the event of a breach of unsecured individually identifiable health information, we will notify affected users and the Federal Trade Commission in accordance with the FTC Health Breach Notification Rule (16 CFR Part 318). Notification will be provided without unreasonable delay, and in no case later than 60 calendar days after discovery of the breach.
        </Typography>
      </LegalSection>

      {/* 11. California Consumer Privacy Act (CCPA/CPRA) */}
      <LegalSection id="california-ccpa" title="11. California Consumer Privacy Act (CCPA/CPRA)">
        <Typography variant="body1">
          If you are a California resident, you have the following rights under the California Consumer Privacy Act as amended by the California Privacy Rights Act:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Right to Know:</strong> You can request information about the categories and specific pieces of personal information we have collected about you, the sources of that information, the purposes for collection, and the third parties with whom we share it.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Delete:</strong> You can request deletion of your personal information. Use the in-app account deletion feature or contact us.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Correct:</strong> You can request correction of inaccurate personal information.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Opt-Out of Sale:</strong> We do not sell your personal information. We do not share your personal information for cross-context behavioral advertising.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Right to Limit Use of Sensitive Personal Information:</strong> Your health data is used solely to provide the App&apos;s analysis features.
            </Typography>
          </li>
        </Box>
        <Typography variant="body1">
          To exercise these rights, contact us at{' '}
          <a href="mailto:privacy@24hurineanalysis.com">privacy@24hurineanalysis.com</a>.
          You may also designate an authorized agent to make requests on your behalf. We will verify your identity before processing any request.
        </Typography>
      </LegalSection>

      {/* 12. Encrypted Cloud Storage */}
      <LegalSection id="encrypted-cloud" title="12. Encrypted Cloud Storage">
        <Typography variant="body1">
          When you opt in to cloud document storage, scanned lab report images are encrypted on your device before upload:
        </Typography>
        <Box component="ul">
          <li>
            <Typography variant="body1">
              <strong>Encryption:</strong> Documents are encrypted using AES-256-GCM, a military-grade encryption standard, before leaving your device.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Key Storage:</strong> Encryption keys are stored exclusively in your device&apos;s Secure Enclave/Keychain and never transmitted to our servers.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Server Storage:</strong> Our servers store only encrypted blobs. We cannot read your documents.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Deletion:</strong> All encrypted documents are permanently deleted when you delete your account. You can also delete individual documents at any time.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Cross-Device:</strong> Document decryption requires access to the originating device&apos;s encryption key. Cross-device key sharing is planned for a future release.
            </Typography>
          </li>
        </Box>
      </LegalSection>

      {/* 13. Children's Privacy */}
      <LegalSection id="children" title="13. Children's Privacy">
        <Typography variant="body1">
          The App is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal data, please contact us so we can take appropriate action.
        </Typography>
      </LegalSection>

      {/* 14. Changes to This Policy */}
      <LegalSection id="changes" title="14. Changes to This Policy">
        <Typography variant="body1">
          We may update this privacy policy from time to time. Any changes will be reflected in the App with an updated effective date. Continued use of the App after changes are posted constitutes your acceptance of the revised policy.
        </Typography>
      </LegalSection>

      {/* Contact Us */}
      <LegalSection id="contact" title="Contact Us">
        <LegalContactGrid
          items={[
            {
              label: 'Privacy Inquiries',
              content: (
                <a href="mailto:privacy@24hurineanalysis.com">privacy@24hurineanalysis.com</a>
              ),
            },
            {
              label: 'General Support',
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
