// src/setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

// Polyfill the required Node modules
global.Buffer = require('buffer/').Buffer;
global.process = require('process');

configure({ adapter: new Adapter() });
