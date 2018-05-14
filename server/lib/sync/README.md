# Sync Event Workflows

Below are the workflows for keeping EcoSML, EcoSIS and Github all in sync.  Under the hood EcoSML is just an index for data stored in Github and EcoSIS which are the real 'sources of truth'.  Github stores all EcoSML code, documentation and metadata.  EcoSIS stores all users and organizations.  Users authentication via EcoSIS and the EcoSML ACL list is set via EcoSIS Organizations.

# Sync All

The `/server/lib/cmds/sync-all.js` script will completely recreate the state of a EcoSML instance from EcoSIS Organizations and Github Repositories.  The workflow is as follows.

- Query Github for all repositories
- Query each repository and insert into MongoDB
  - Transform Github API response to EcoSML Package object
  - request README.md, set to package `description`
  - query package releases, transform to EcoSML release object
  - request ecosml-metadata.json, parse and set additional EcoSML metadata
- Query Github for all organization Teams.  We want the Github Teams in MongoDB so the Github Teams can be queried below when we sync organizations.
  - request all github teams
  - for each team request team
  - request members
  - request repos
- Query EcoSIS Data Management (CKAN) for all organizations
  - request organization, insert org into redis
  - insert org member role triples into redis as keys for ACL.
  - verify ecosis org is sync with github team
    - this includes repository access and team members if Github username provided (TODO)

# Github Commit

On commit, github will post to cloud function which will then write entry to firestore.

- Server listens to firestore updates
- On update checks committer
- if ecosml user ignore.  Otherwise validate ecosml-metadata.json.
- removes firestore message

# Github Team Update 

On team update or team member update, github will post to cloud function which will then write entry to firestore

- Server will listen to firestore updates
- on update, refreshes MongoDB github team collection from Github
- removes firestore message

# EcoSIS Organization update

On organization update, EcoSIS will post to cloud function which will then write entry to firestore

- Server will listen to firestore updates
- on update, refreshes organization from EcoSIS (CKAN) API in Redis
- Queries MongoDB team collection and verifies if changes are required
  - if changes are required the team updates are preformed on Github via API
  - The changes to the team on Github will trigger a Github Team Update event (see above)
  - EcoSML will then respond to this event to sync Github Team updates to local mongodb instance.