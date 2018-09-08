module.exports = {
  package : [
    {
      index : {
        name: "text",
        desciption : "text",
        keywords: "text",
        overview: "text"
      },
      options : {
        weights: {
          name: 10,
          keywords: 8,
          overview : 5,
          desciption : 2
        },
        name: "TextIndex",
        language_override : "_lang"
      }
    },
    {
      index : {
        releaseCount: 1
      },
      options : {
        name : 'ReleaseCountIndex'
      }
    },
    {
      index : {
        keywords: 1
      },
      options : {
        name: "KeywordIndex"
      }
    },
    {
      index : {
        id: 1
      },
      options : {
        name: "IdIndex"
      }
    },
    {
      index : {
        githubId: 1
      },
      options : {
        name: "GithubIdIndex"
      }
    },
    {
      index : {
        private: 1
      },
      options : {
        name: "PrivateIndex"
      }
    },
    {
      index : {
        language: 1
      },
      options : {
        name: "LanguageIndex"
      }
    }

  ],
  'github-team' : [
    {
      index : {
        slug: 1,
        id: 1
      },
      options : {
        name: "GithubTeamIndex"
      }
    },
    {
      index : {
        repos : 1
      },
      options : {
        name: "GithubTeamReposIndex"
      }
    },
    {
      index : {
        'members.login' : 1,
        'members.id' : 1
      },
      options : {
        name: "GithubTeamMembersIndex"
      }
    }
  ]
}