const { Client, logger } = require("camunda-external-task-client-js");
const { Variables } = require("camunda-external-task-client-js");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger, asyncResponseTimeout: 5000};

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("CalculateDistanceToSurface", async function({ task, taskService }) {
  // Put your business logic
  const processVariables = new Variables();
  var lastKnownDistance = task.variables.get("lastKnownDistance");

  newKnownDistance = lastKnownDistance - Math.floor(Math.random() * 100);

  processVariables.set("lastKnownDistance", newKnownDistance);
  console.log('Distance left to Mars '+ newKnownDistance )
  // complete the task
  await taskService.complete(task, processVariables);
});