# Security Specification: ORU Port Harcourt Study Center Firestore

## 1. Data Invariants
- **Applications Integrity**: An admission application must contain valid personal info and cannot be approved, enrolled, or rejected by anyone other than an Administrator.
- **Student Profile Security**: A student profile can only be read by the student themselves (matched by verified email/uid) or an administrator. Students cannot modify registration state fields or matric numbers.
- **Support Messages Accessibility**: Support messages can be created anonymously or by authenticated guests. Inquiries are readable only by administrators or if matching the sender's email.
- **Announcement Publications**: Announcements are read-only to the public; only Administrators can create, edit, or delete them.

## 2. Invariants & Access Control Roles
- **Admins**: Determined by presence in `/admins/{adminId}` or by checking specific admin emails. Since we want an easily administrable concept app, we check if the user is in `/admins/$(request.auth.uid)`.
- **User Verification**: Email verification `request.auth.token.email_verified == true` is required for authorized authenticated operations.

## 3. The "Dirty Dozen" Malicious Payloads Checked & Blocked
1. **Identity Spoofing on Create**: Attempting to submit an application with raw status set to "enrolled" or "approved" to bypass admissions. (Blocked: `status` must be validated or restricted).
2. **PII Data Leakage**: An unauthenticated user attempts to read some other prospective student's application. (Blocked: applications are locked down to owner or admin).
3. **Ghost Field Update**: Authenticated user attempts to write extra fields like `isVip: true` to their user profile. (Blocked: via strict affectedKeys and schema).
4. **Privilege Escalation**: Attempting to create an admin entry in `/admins/$(request.auth.uid)`. (Blocked: access to `/admins` is write-disabled/restricted).
5. **Denial of Wallet String Poisoning**: Injecting massive strings (1MB+) into short fields in support messages or application form to inflate Firestore costs. (Blocked: explicit `.size() <= 200`/`500` boundaries checked in functions).
6. **Immutable Field Tampering**: Modifying `createdAt` or `email` after submitting an application. (Blocked: enforces incoming equal to existing).
7. **Bypassing Server Timestamp**: Injecting arbitrary client timestamps for `createdAt` instead of `request.time`. (Blocked: enforces `request.time`).
8. **Malicious ID Poisioning**: Creating an application with document ID of `/applications/SOME_HUGE_JUNK_ID...`. (Blocked: ID pattern matching and length checks).
9. **Query Scrape Attack**: Doing a blanket `list` query on `/students` to fetch all students list. (Blocked: list rule enforces `resource.data.email == request.auth.token.email`).
10. **Application State Shortcutting**: A student attempting to update their own application's status to "approved". (Blocked: updates to `status` are protected).
11. **Unauthorized Announcement Editing**: A student attempting to modify an announcement to postpone exams. (Blocked: write is restricted to admins).
12. **Zombie Messages**: Injecting spam messages into support channels. (Blocked: rate levels, short boundary sizes).

## 4. Firestore Rules Draft Spec

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
