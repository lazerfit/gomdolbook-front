import styled from 'styled-components'

type Props = {}

const Wrapper = styled.div`
  text-align: center;
  display: flex;
`

const MainSlogan = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 89px;
  font-weight: 600;
  line-height: 120%;
  font-family: 'Eczar', serif;
`

const Banner = (props: Props) => {
  return (
    <Wrapper>
      <MainSlogan>Collect your Books</MainSlogan>
    </Wrapper>
  )
}

export default Banner
