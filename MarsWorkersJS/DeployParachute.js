const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger, asyncResponseTimeout: 5000 };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("DeployParachute", async function({ task, taskService }) {
  // Put your business logic
  var parachuteStatus = Math.random() < 0.4;
  const processVariables = new Variables();
  processVariables.set("parachuteStatus", parachuteStatus);

if(parachuteStatus){
  await taskService.complete(task, processVariables);
}else{
  // Handle a BPMN Failure
  await taskService.handleBpmnError(task, "DEPLOY_FAIL", "DEPLOY_FAIL", processVariables);
}
  
});