// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const {logger} = require('./logging'); // Import winston logger instance

let project;
const initTracing = projectId => {
  project = projectId;
};

// Add logging field with trace ID for logging correlation
// For more info, see https://cloud.google.com/run/docs/logging#correlate-logs
const requestLogger = (req, res, next) => {
  const traceHeader = req.header('X-Cloud-Trace-Context');
  let trace;
  if (traceHeader) {
    const [traceId] = traceHeader.split('/');
    trace = `projects/${project}/traces/${traceId}`;
  }
  req.logger = logger.child({'logging.googleapis.com/trace': trace});
  next();
};

module.exports = {
  requestLogger,
  initTracing,
};