/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/12/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React from 'react';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
const Hello = () => (
    <div>
        <h1>Hello World </h1>
        We are using Node.js {process.versions.node}
        ,
        Chromium
        <script>document.write(process.versions.chrome)</script>
        ,
        and Electron
        <script>document.write(process.versions.electron)</script>
        .
    </div>
);

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default Hello;
