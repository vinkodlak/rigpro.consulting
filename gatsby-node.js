const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const remark = require("remark");
const remarkHTML = require("remark-html");

const processField = (field) => {
  return remark().use(remarkHTML).processSync(field).toString()
}

exports.createResolvers = ({ createResolvers  }) => {
  const resolvers = {
    MarkdownRemarkFrontmatterSection1: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
    MarkdownRemarkFrontmatterSection2: {
      body: {
        resolve: (source) => processField(source.body)
      },
    },
    MarkdownRemarkFrontmatterSection3: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
    MarkdownRemarkFrontmatterSection2Experiences: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
    MarkdownRemarkFrontmatterWorkflows: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
    MarkdownRemarkFrontmatterSectionsPart1: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
    MarkdownRemarkFrontmatterSectionsPart2: {
      body: {
        resolve: (source) => processField(source.body)
      }
    },
  }
  createResolvers(resolvers)
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      if (!['settings-page', 'author', 'blog-post'].includes(edge.node.frontmatter.templateKey)) {
        createPage({
          path: edge.node.fields.slug,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id,
          },
        })
      }
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // if (node.frontmatter.templateKey == 'about-page') {
    //   const body = node.frontmatter.section1.body

    //   if (body) {
    //     parseField(node, body, 'body', createNodeField)
    //   }
    // }

  }
}
