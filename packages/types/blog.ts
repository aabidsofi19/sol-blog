export type Blog = {
  "version": "0.1.0",
  "name": "blog",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "blogPost",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "bannerIpfsHash",
          "type": "bytes"
        },
        {
          "name": "contentIpfsHash",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "blogPost",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "bannerIpfsHash",
          "type": "bytes"
        },
        {
          "name": "contentIpfsHash",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blogPost",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "bannerIpfsHash",
            "type": "bytes"
          },
          {
            "name": "contentIpfsHash",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided topic should be 100 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 2800 characters long maximum."
    }
  ]
};

export const IDL: Blog = {
  "version": "0.1.0",
  "name": "blog",
  "instructions": [
    {
      "name": "createPost",
      "accounts": [
        {
          "name": "blogPost",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "bannerIpfsHash",
          "type": "bytes"
        },
        {
          "name": "contentIpfsHash",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "updatePost",
      "accounts": [
        {
          "name": "blogPost",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "bannerIpfsHash",
          "type": "bytes"
        },
        {
          "name": "contentIpfsHash",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blogPost",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "bannerIpfsHash",
            "type": "bytes"
          },
          {
            "name": "contentIpfsHash",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "TitleTooLong",
      "msg": "The provided topic should be 100 characters long maximum."
    },
    {
      "code": 6001,
      "name": "ContentTooLong",
      "msg": "The provided content should be 2800 characters long maximum."
    }
  ]
};
