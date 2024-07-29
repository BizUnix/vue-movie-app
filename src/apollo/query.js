import gql from 'graphql-tag'

const Movies_Query = gql`
    query Movies($pagination: PaginationInput) {
        movies(pagination: $pagination) {
          nodes {
            title
            duration
            datePublished
            posterUrl
            rating
            ratingValue
            summary,
            genres {
              title
            }
          }
          pagination {
            page
            perPage
            totalPages
          }
        }
      }
    `
const Genres_Query= gql`
    query Genres($pagination: PaginationInput) {
    genres(pagination: $pagination) {
      nodes {
        id
        title
      }
      pagination {
        page
        perPage
        totalPages
      }
    }
  }
  `

export { Movies_Query, Genres_Query }