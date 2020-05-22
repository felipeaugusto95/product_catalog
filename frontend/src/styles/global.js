// import { createGlobalStyle } from "styled-components";

// import "react-circular-progressbar/dist/styles.css";

// export default createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     outline: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: Arial, Helvetica, sans-serif;
//     font-size: 14px;
//     background: #F19134;
//     text-rendering: optimizeLegibility;
//     -webkit-font-smoothing: antialiased;
//   }

//   html, body, #root {
//     height: 100%;
//   }
// `;

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: #F19134;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    html, body, #root {
        height: 100%;
    } 

    li, button{
        padding: 10px;
        margin: 10px;
    }

    h2{
        margin-bottom: 15px;
        padding-bottom:15px;
    }

    .customized{
        background-color: #FFF;
        width: 100%;
        max-width: 400px;
        margin: 15px;
        padding:15px;
    }
`;