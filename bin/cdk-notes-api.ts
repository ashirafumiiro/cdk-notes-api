#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkNotesApiStack } from '../lib/cdk-notes-api-stack';

const app = new cdk.App();
new CdkNotesApiStack(app, 'CdkNotesApiStack');
