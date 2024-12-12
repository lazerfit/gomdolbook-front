import {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import '../../styles/variables.css'
import {IoIosCheckmarkCircleOutline} from 'react-icons/io'
import {MdErrorOutline} from 'react-icons/md'
import {createPortal} from 'react-dom'

const Wrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
  background-color: black;
  color: white;
  z-index: 10001;
  width: 300px;
  height: 70px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  font-size: 24px;
  display: flex;
  margin-bottom: 2px;
  margin-right: 8px;
  color: #4ea699;
`

type Props = {
  isVisible: boolean
  isError: boolean
  onChangeVisibility: () => void
  message: {
    success: string
    error: string
  }
}

const Toast = (props: Props) => {
  useEffect(
    function toastTimeout() {
      if (props.isVisible) {
        const timer = setTimeout(() => props.onChangeVisibility(), 3000)

        return () => clearTimeout(timer)
      }
    },
    [props.isVisible]
  )

  if (!props.isVisible) return null
  return createPortal(
    <Wrapper>
      <Icon>
        {props.isError ? (
          <MdErrorOutline style={{color: 'red'}} />
        ) : (
          <IoIosCheckmarkCircleOutline />
        )}
      </Icon>
      {props.isError ? (
        <div>{props.message.error}</div>
      ) : (
        <div>{props.message.success}</div>
      )}
    </Wrapper>,
    document.body
  )
}

export default Toast
