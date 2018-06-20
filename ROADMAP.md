*Last Updated: 6/19/18*
# Milestones

## Current: Gold Design (Overview)
### Username/TOTP Authentication
- Each author has a unique username and TOTP token used to authenticate.
- Invite-Only account creation. (Only authors need accounts.)
- TOTP token and QR Code sent upon account creation

### REST API
- JWT used to authenticate protected routes.

### Primary Feed
- Filterable by Author and Category
- Searchable by Keyword(s)
- Sortable by Date and Length
- Site Analytics and Breakdown

### Post Editor
- Live Preview
- Toggleable Word Counter
- Syntax Suggestions (ie. remove adverbs)

### Author Portfolio
- Author Feed
- Author Analytics and Breakdown

### Creativity Corner
- Creative Writing Prompts
- Trope of the Day
- Word of the Day

### Analytics and Breakdown (NLP Processing)
- Word Count
- Word Average (Per Post)
- Longest Sentence
- Average Sentence Length
- Most Popular for each part of speech (nouns, pronouns, adjective, etc)
- More Stats and Breakdowns


##  Future
### Collaborative Editing
- Collaborative Editing mode
- Inline commenting
- Suggested Edits and Confirmations
- Tracking Individual Revisions

### E2E/Unit Testing
- Setup Test Framework
- Continuous Deployment

### Scheduling
- Saved Drafts
- Set Future Publish Date

### Email Integration
- Registration Confirmation
- TOTP Authentication Token
- Adminstrative Alerts
  - Multiple Failed Authentications
  - Administrative Logins
  
### Social Media
- Sharing
- Social Sign-In/OAuth (for commenting/feedback)

### Media Library
- Upload Videos and Graphics via UI
- Mark Private (Only visible to certain users/groups)

### Real-Time Chat
- Chat Messenging in Real-Time between Authors and Readers