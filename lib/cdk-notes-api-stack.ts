import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs';

export class CdkNotesApiStack extends Stack {
  declare notesBackend: apigateway.LambdaIntegration;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const notesBackend: apigateway.LambdaIntegration = new apigateway.LambdaIntegration();
    const api = new apigateway.RestApi(this, 'NotesRestApi', {
      defaultIntegration: this.notesBackend, 
      apiKeySourceType: undefined
    });

    const notes = api.root.addResource('notes');
    notes.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS, 
      allowMethods: apigateway.Cors.ALL_METHODS});

    notes.addMethod('GET', new apigateway.LambdaIntegration(new lambda.Function(this, "GetAllHandler", {
      handler: 'handler.getAll',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    })))

    notes.addMethod('POST', new apigateway.LambdaIntegration(new lambda.Function(this, "AddOneHandler", {
      handler: 'handler.create',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    })))
    
    const note = notes.addResource('{id}');
    note.addMethod('GET', new apigateway.LambdaIntegration(new lambda.Function(this, "GetOneHandler", {
      handler: 'handler.getOne',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    })))

    note.addMethod('PUT', new apigateway.LambdaIntegration(new lambda.Function(this, "UpdateHandler", {
      handler: 'handler.update',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    })))

    note.addMethod('DELETE', new apigateway.LambdaIntegration(new lambda.Function(this, "DeleteHandler", {
      handler: 'handler.delete',
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.seconds(10)
    })))
  }
}
