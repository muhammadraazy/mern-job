import styled from "styled-components"

export const Wrapper = styled.main`
    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }

    .page {
      min-height: calc(100vh - var(--nav-height));
      display: grid;
      justify-items: space-between;
      grid-template-columns: repeat(1, 1fr);
      align-items: center;
      margin-top: 2rem;

      h1 {
        font-weight: 700;
        
        strong {
          color: var(--primary-500);
        }
      }
      
      p {
        ${'' /* max-width: 10em; */}
        color: var(--grey-600);
      }

      .main-img {
        width: 500px;
        height: 400px;
        display: none;
      }
    }



  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;

      .main-img {
        display: block;
    }
    }
  }
`