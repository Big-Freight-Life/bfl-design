import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import LegalDocLayout from '@/components/legal/LegalDocLayout';
import {
  LegalSection,
  LegalSubheading,
  LegalNotice,
  LegalTOC,
  LegalContactGrid,
} from '@/components/legal/LegalSection';

export default function BioBreakPrivacyPage() {
  return (
    <LegalDocLayout
      productName="Bio Break"
      title="Privacy Policy"
      version="2.0"
      lastUpdated="March 30, 2026"
      effectiveDate="March 30, 2026"
      intro="Big Freight Life LLC (&ldquo;we&rdquo;, &ldquo;us&rdquo;), the developer of Bio Break, is committed to protecting your privacy. Bio Break is designed to be private by default — there are no ads and we do not use third-party analytics or behavioral tracking. Free features store data locally on your device. Pro subscribers' data syncs to our secure cloud backend, and optional AI-powered features process health data summaries via Google's Gemini API."
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
          { id: 'ai-features', label: 'AI-Powered Features' },
          { id: 'information-sharing', label: 'Information Sharing' },
          { id: 'data-storage', label: 'Data Storage & Security' },
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
        <LegalSubheading>Account Information (Pro)</LegalSubheading>
        <Box component="ul">
          <li>Email address (via Sign in with Apple)</li>
          <li>Display name (via Sign in with Apple)</li>
          <li>Apple user identifier</li>
        </Box>

        <LegalSubheading>Health &amp; Fitness Data</LegalSubheading>
        <Box component="ul">
          <li>Bathroom visit timestamps, urgency ratings, pain indicators, urine color, Bristol Stool Scale type, duration, and notes</li>
          <li>Hydration logs (fluid type, amount, electrolyte content)</li>
          <li>Symptom entries (GI and general symptoms, severity, duration)</li>
          <li>Food logs (food name, meal type, category)</li>
          <li>Medication logs (name, dosage, frequency)</li>
        </Box>

        <LegalSubheading>Apple HealthKit Data</LegalSubheading>
        <Box component="ul">
          <li>Heart rate and resting heart rate (read-only)</li>
          <li>Blood pressure systolic and diastolic (read-only)</li>
          <li>HealthKit data is read for local display only and is <strong>never transmitted</strong> to any external server or written back to HealthKit</li>
        </Box>

        <LegalSubheading>Device Information</LegalSubheading>
        <Box component="ul">
          <li>Device identifier (for app functionality only)</li>
          <li>Device model and operating system version (sent during authentication for Pro users)</li>
          <li>APNs push notification token (for Pro subscribers)</li>
          <li>App version</li>
        </Box>

        <LegalSubheading>Usage Information</LegalSubheading>
        <Box component="ul">
          <li>Crash reports and diagnostic data (via Firebase Crashlytics)</li>
          <li>Performance data (via Firebase Crashlytics)</li>
          <li>Feature usage events for personalized onboarding (Pro only)</li>
        </Box>

        <LegalSubheading>Community Stats (Opt-In Only)</LegalSubheading>
        <Box component="ul">
          <li>If you opt in to Community Stats, fully anonymized and aggregated data is shared to provide community averages</li>
          <li>No personally identifiable information is included</li>
        </Box>
      </LegalSection>

      {/* 2. How We Use Your Information */}
      <LegalSection id="use-of-information" title="2. How We Use Your Information">
        <LegalSubheading>App Functionality</LegalSubheading>
        <Box component="ul">
          <li>Display hydration status and health insights</li>
          <li>Generate calendar heat maps and pattern analysis</li>
          <li>Provide smart hydration and wellness reminders</li>
          <li>Sync data between iPhone and Apple Watch</li>
          <li>Generate CSV/PDF reports for healthcare providers (Pro)</li>
          <li>Power AI-powered features including conversational logging, pattern detection, health Q&amp;A, and proactive nudges (Pro)</li>
        </Box>

        <LegalSubheading>Service Improvement</LegalSubheading>
        <Box component="ul">
          <li>Bug fixing and crash resolution (via Firebase Crashlytics)</li>
          <li>Feature enhancement and development</li>
        </Box>
      </LegalSection>

      {/* 3. AI-Powered Features */}
      <LegalSection id="ai-features" title="3. AI-Powered Features (Pro Only)">
        <Typography variant="body1">
          Bio Break offers optional AI-powered features for Pro subscribers. These features enhance your tracking experience but are entirely optional and can be disabled at any time.
        </Typography>

        <LegalSubheading>What AI Features Do</LegalSubheading>
        <Box component="ul">
          <li><strong>Conversational Logging:</strong> Log entries through natural language AI chat</li>
          <li><strong>Pattern Detection:</strong> AI analyzes your tracking data to identify trends and correlations</li>
          <li><strong>Health Q&amp;A:</strong> Ask questions about your tracked data and receive informational responses</li>
          <li><strong>Proactive Nudges:</strong> Receive personalized wellness reminders based on your patterns</li>
          <li><strong>Report Narratives:</strong> AI-generated summaries for healthcare provider reports</li>
        </Box>

        <LegalSubheading>How AI Processes Your Data</LegalSubheading>
        <Box component="ul">
          <li>When you use AI features, a <strong>summary</strong> of your recent health logs (entries, symptoms, medications, food) is sent to our secure backend</li>
          <li>Our backend processes the request via <strong>Google&apos;s Gemini API</strong> (paid tier)</li>
          <li>Google does <strong>not</strong> use paid API tier data for model training</li>
          <li>Data is processed transiently and not retained by Google for training purposes</li>
          <li>AI responses are generated in real-time and are for <strong>informational purposes only</strong> — they do not constitute medical advice</li>
        </Box>

        <LegalSubheading>AI Limitations</LegalSubheading>
        <Box component="ul">
          <li>AI features will never diagnose medical conditions</li>
          <li>AI responses are general guidance, not medical advice</li>
          <li>Always consult a healthcare professional for medical concerns</li>
        </Box>
      </LegalSection>

      {/* 4. Information Sharing */}
      <LegalSection id="information-sharing" title="4. Information Sharing">
        <LegalNotice>
          <Typography variant="body2">
            <strong>We do not sell your personal information. We do not use third-party behavioral analytics or advertising.</strong>
          </Typography>
        </LegalNotice>

        <LegalSubheading>Limited Sharing</LegalSubheading>
        <Typography variant="body1">We may share your information only in the following circumstances:</Typography>
        <Box component="ul">
          <li><strong>With your explicit consent</strong></li>
          <li><strong>AI feature usage:</strong> Health data summaries sent to Google Gemini API when you use AI features (Pro only)</li>
          <li><strong>Legal obligations:</strong> When required by law or legal process</li>
          <li><strong>Community Stats:</strong> Fully anonymized, aggregated data (opt-in only)</li>
        </Box>

        <LegalSubheading>Third-Party Services</LegalSubheading>
        <Box component="ul">
          <li><strong>Apple iCloud (CloudKit):</strong> End-to-end encrypted data sync for Pro subscribers</li>
          <li><strong>Apple App Store:</strong> Subscription payment processing</li>
          <li><strong>Convex:</strong> Cloud backend for Pro subscriber data sync and AI feature processing. Data is stored securely and encrypted in transit</li>
          <li>
            <strong>Google Gemini API:</strong> Processes health data summaries for AI features (Pro only). Google does not use paid API tier data for model training. See{' '}
            <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Google&apos;s API Terms</a>
          </li>
          <li>
            <strong>Firebase Crashlytics:</strong> Crash reports and performance diagnostics linked to an installation identifier. See{' '}
            <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a>
          </li>
          <li><strong>Apple Push Notification Service (APNs):</strong> Delivers push notifications to Pro subscribers</li>
        </Box>
      </LegalSection>

      {/* 5. Data Storage & Security */}
      <LegalSection id="data-storage" title="5. Data Storage & Security">
        <LegalSubheading>On-Device Storage</LegalSubheading>
        <Box component="ul">
          <li><strong>Local by default:</strong> All health data is stored on your device using iOS Data Protection (NSFileProtectionComplete)</li>
          <li><strong>Keychain:</strong> Authentication credentials stored with kSecAttrAccessibleWhenUnlockedThisDeviceOnly</li>
        </Box>

        <LegalSubheading>Cloud Sync (Pro)</LegalSubheading>
        <Box component="ul">
          <li><strong>Convex backend:</strong> Pro subscriber data syncs to our Convex cloud backend, encrypted in transit (TLS) and at rest</li>
          <li><strong>iCloud (CloudKit):</strong> Data also syncs via Apple&apos;s CloudKit with end-to-end encryption</li>
        </Box>

        <LegalSubheading>HealthKit Data</LegalSubheading>
        <Box component="ul">
          <li>HealthKit data (heart rate, blood pressure) is read locally and <strong>never transmitted</strong> off-device</li>
          <li>HealthKit data is not stored in iCloud or synced to any backend</li>
        </Box>

        <LegalSubheading>Privacy Manifest</LegalSubheading>
        <Box component="ul">
          <li><strong>NSPrivacyTracking:</strong> false — we do not track users</li>
          <li><strong>Tracking domains:</strong> None</li>
        </Box>
      </LegalSection>

      {/* 6. Data Retention */}
      <LegalSection id="data-retention" title="6. Data Retention">
        <LegalSubheading>On-Device Data</LegalSubheading>
        <Box component="ul">
          <li>Data is retained on your device for as long as you use the app</li>
          <li>Uninstalling the app removes all local data</li>
        </Box>

        <LegalSubheading>Cloud Data (Pro)</LegalSubheading>
        <Box component="ul">
          <li>Account data is retained while your account is active</li>
          <li>You can delete your account and all server-side data through the app&apos;s Account settings</li>
          <li>Account deletion permanently removes all data from our servers</li>
        </Box>

        <LegalSubheading>AI Data</LegalSubheading>
        <Box component="ul">
          <li>Health data sent to Google Gemini API is processed transiently and not retained for model training (paid tier)</li>
          <li>AI conversation history is not persistently stored on Google&apos;s servers</li>
        </Box>
      </LegalSection>

      {/* 7. Cookies & Tracking */}
      <LegalSection id="cookies-tracking" title="7. Cookies & Tracking">
        <LegalSubheading>What We Don&apos;t Do</LegalSubheading>
        <Box component="ul">
          <li>No cookies</li>
          <li>No third-party behavioral analytics (we use Firebase Crashlytics for crash reporting only, not behavioral analytics)</li>
          <li>No advertising SDKs</li>
          <li>No cross-site tracking</li>
          <li>No behavioral profiling</li>
        </Box>
      </LegalSection>

      {/* 8. Children's Privacy (COPPA) */}
      <LegalSection id="children" title="8. Children's Privacy (COPPA)">
        <LegalSubheading>Age Requirements</LegalSubheading>
        <Box component="ul">
          <li><strong>Age rating:</strong> 4+ (suitable for all ages)</li>
          <li>Free features do not require account creation</li>
          <li>Pro features require Sign in with Apple (account creation)</li>
          <li>The app does not knowingly collect personal information from children under 13</li>
        </Box>

        <LegalNotice>
          <Typography variant="body2">
            <strong>COPPA Requests:</strong> Email <a href="mailto:privacy@bflux.co">privacy@bflux.co</a> with subject line &ldquo;COPPA Request&rdquo;
          </Typography>
        </LegalNotice>
      </LegalSection>

      {/* 9. International Data Transfers */}
      <LegalSection id="international-transfers" title="9. International Data Transfers">
        <Box component="ul">
          <li><strong>Local storage:</strong> Health data is stored on your device and does not leave your device unless you use Pro features</li>
          <li><strong>iCloud sync:</strong> If enabled, data is transferred and stored by Apple under their privacy terms</li>
          <li><strong>Cloud backend:</strong> If you use Pro features, your data may be transferred to Convex servers and Google&apos;s Gemini API servers, which may be located outside your country</li>
        </Box>
      </LegalSection>

      {/* 10. California Privacy Rights (CCPA/CPRA) */}
      <LegalSection id="ccpa" title="10. California Privacy Rights (CCPA/CPRA)">
        <LegalSubheading>Your Rights Under California Law</LegalSubheading>
        <Box component="ul">
          <li><strong>Right to Know:</strong> What personal information we collect and how it&apos;s used</li>
          <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
          <li><strong>Right to Correct:</strong> Request correction of inaccurate information</li>
          <li><strong>Right to Opt-Out:</strong> Opt-out of sale or sharing of personal information</li>
          <li><strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices</li>
        </Box>

        <LegalNotice>
          <Typography variant="body2">
            <strong>Important:</strong> We do not sell personal information and do not share personal information for cross-context behavioral advertising.
          </Typography>
        </LegalNotice>

        <LegalSubheading>How to Exercise Your Rights</LegalSubheading>
        <Box component="ul">
          <li>Email: <a href="mailto:privacy@bflux.co">privacy@bflux.co</a></li>
          <li>Subject line: &ldquo;CCPA Request&rdquo;</li>
          <li>Response time: 45 days</li>
        </Box>
      </LegalSection>

      {/* 11. European Privacy Rights (GDPR) */}
      <LegalSection id="gdpr" title="11. European Privacy Rights (GDPR)">
        <LegalSubheading>Legal Basis for Processing</LegalSubheading>
        <Box component="ul">
          <li><strong>Consent:</strong> For health data and optional features (Community Stats)</li>
          <li><strong>Contract:</strong> To provide the services you&apos;ve requested</li>
          <li><strong>Legitimate Interests:</strong> For crash reporting and app improvement</li>
        </Box>

        <LegalSubheading>Additional Rights for EU/EEA Users</LegalSubheading>
        <Box component="ul">
          <li><strong>Right to Lodge a Complaint:</strong> With your local data protection authority</li>
          <li><strong>Right to Withdraw Consent:</strong> At any time, without affecting prior processing</li>
          <li><strong>Right to Transparency:</strong> Clear information about data processing</li>
        </Box>
      </LegalSection>

      {/* 12. Your Data Rights */}
      <LegalSection id="your-rights" title="12. Your Data Rights">
        <LegalSubheading>Rights Available to All Users</LegalSubheading>
        <Box component="ul">
          <li><strong>Access:</strong> All your data is on your device — you have full access at all times</li>
          <li><strong>Portability:</strong> Export your data as CSV or PDF through the app (Pro)</li>
          <li><strong>Erasure:</strong> Delete your data within the app or by uninstalling</li>
          <li><strong>Account Deletion:</strong> Delete your account and all server-side data through Profile &gt; Account settings (Pro)</li>
          <li><strong>Object:</strong> Opt out of Community Stats or AI features at any time in app settings</li>
        </Box>

        <LegalSubheading>How to Contact Us</LegalSubheading>
        <Box component="ul">
          <li><strong>Support:</strong> <Link href="/support/bio-break">bfl.design/support/bio-break</Link></li>
          <li><strong>Response Time:</strong> Within 30 days</li>
        </Box>
      </LegalSection>

      {/* Contact */}
      <LegalSection id="contact" title="Contact Us">
        <LegalContactGrid
          items={[
            {
              label: 'Support',
              content: <Link href="/support/bio-break">bfl.design/support/bio-break</Link>,
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
