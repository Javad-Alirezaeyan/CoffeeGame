import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
`;

export const Header = styled.div`
  background-color: ${props => props.theme.bg};
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
export const Countbutton = styled.button`
display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`

export const Labelnumber = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
export const Labeltitle = styled.h4`
  font-size: .5em;
  text-align: center;
  color: palevioletred;
`;

export const Wrappercups = styled.div`
   padding: 15px;
   width: 25%;
   float: left;
   
  @media (max-width: 1200px) {
     padding: 0px;
     width: 33%;
  }
  @media (max-width: 600px) {
     width: 50%;
     padding: 0px;
  }

`

export const Imagecups = styled.img`
   padding: 15px;
   float: left;
`


export const Wrapperoperation = styled.div`
   padding: 15px;
    align-items: center;
  justify-content: center;
  background-color: #eeeeee;
   @media (max-width: 600px) {
     padding: 1px;
  }
`
export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  width : 100px;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
  @media (max-width: 600px) {
     padding: 1px;
     width : 80px;
     font-size: 0.75em;
  }
`;


export const Wrapperstopwatch = styled.div`
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align : center,
  
`;

export const GameSection = styled.section`
    maegin-top: 60px;
    width: 66%;
    float: left;
    padding: 15px;
    @media (max-width:1023px) {
        width: 100%;
        float: left;
        padding: 15px;
    }
    @media (max-width:767px) {
       width: 100%;
       padding: 10px;
    }
    @media (max-width:480px) {
       width: 100%;
       padding: 5px;
    }
`

export const InfoSection = styled.section`
    width: 34%;
    float: left;
    padding: 15px;
    @media (max-width:1023px) {
        width: 100%;
        float: left;
        padding: 15px;
    }
    @media (max-width:767px) {
       width: 100%;
       padding: 10px;
    }
    @media (max-width:480px) {
       width: 100%;
       padding: 5px;
    }
`

export const Card = styled.div`
     position: relative;
    display: -ms-flexbox;
    display: flex;

    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
`
export const CardBody = styled.div`
     -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
`
export const CardTitle = styled.h4`
    margin-bottom: .75rem;
`


export const Maincontent = styled.main`
    flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 60px;
`

export const Table = styled.table`

`;


export const Alert = styled.div`
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: .25rem;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.bg};
    border-color:  ${props => props.theme.border};
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
`;

export const Label = styled.label`
    font-size: 18px;
    
`
export const LabelValue = styled.label`
   color: ${props => props.color};
   font-size: 22px;
`



