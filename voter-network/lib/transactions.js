/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

const helpers = require('../helpers.js');

/* ****************** PARTICIPANTS  ****************** */

// VOTER

/**
 * Sample transaction processor function.
 * @param {org.univote.addVoter} addVoter The sample transaction instance.
 * @transaction
 */

 async function addVoter(newVoterData) {

    // Get the JSON object with the new voter data
    let newVoter = newVoterData;

    // Create participant registry connection
	const VoterRegistry = await getParticipantRegistry('org.univote.Voter');

    // Create the unique voterId hash
    let voterId = helpers.createId()
    // Check the ID for existing ID

    newVoter.voterId = voterId;

    // Add the voter perticipant to the blockchain
    await VoterRegistry.add(newVoter);

    // Create the return value JSON
    returnValue = {
        'firstName' : newVoter.firstName,
        'lastName' : newVoter.lastName,
        'address' : newVoter.address,
        'city' : newVoter.city,
        'state' : newVoter.state,
        'zip' : newVoter.zip,
        'jurisdiction' : newVoter.jurisdiction
    };

    return returnValue;
 }


/**
 * Sample transaction processor function.
 * @param {org.univote.updateVoter} updateVoter The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVoter} deleteVoter The sample transaction instance.
 * @transaction
 */

//VERIFIER

/**
 * Sample transaction processor function.
 * @param {org.univote.Verifier} addVerifier The sample transaction instance.
 * @transaction
 */

async function addVerifier(newVerifierData) {

    // Get the JSON object with the new voter data
    let newVerifier = newVerifierData;

    // Create participant registry connection
	const VerifierRegistry = await getParticipantRegistry('org.univote.Verifier');

    // Create the unique voterId hash
    let verifierId = helpers.createId()
    // Check the ID for existing ID

    newVerifier.verifierId = verifierId;

    // Add the verifier participant to the blockchain
    await VerifierRegistry.add(newVerifier);

    // Create the return value JSON
    returnValue = {
        'firstName' : newVerifier.firstName,
        'lastName' : newVerifier.lastName,
    };

    return returnValue;
 }
 
/**
 * Sample transaction processor function.
 * @param {org.univote.updateVerifier} updateVerifier The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteVerifier} deleteVerifier The sample transaction instance.
 * @transaction
 */




/* ****************** ASSETS  ****************** */

//ELECTION

/**
 * Sample transaction processor function.
 * @param {org.univote.addElection} addElection The sample transaction instance.
 * @transaction
 */

async function addElection(newElectionData) {

    // Get the JSON object with the new voter data
    let newElection = newElectionData;

    // Create participant registry connection
	const ElectionRegistry = await getAssetRegistry('org.univote.Election');

    // Create the unique voterId hash
    let electionId = helpers.createId()
    // Check the ID for existing ID

    newElection.electionId = electionId;

    // Add the election asset to the blockchain
    await ElectionRegistry.add(newElection);

    // Create the return value JSON
    returnValue = {
        'electionName' : newElection.electionName,
        'electionDescription' : newElection.electionDescription,
        'startDate' : newElection.startDate,
        'endDate' : newElection.endDate
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.addContestToElection} addContestToElection The sample transaction instance.
 * @transaction
 */

async function addContestToElection(newContestData) {

        // Create participant registry connection
        const ElectionRegistry = await getAssetRegistry('org.univote.Election');

        let newContest = newContestData.contest;

        // Add the new contest to the election object
        newContestData.election.contests.push(newContest)

        // Update the election asset on the blockchain
        await ElectionRegistry.update(newContestData.election);



}

 /**
 * Sample transaction processor function.
 * @param {org.univote.updateElection} updateElection The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteElection} deleteElection The sample transaction instance.
 * @transaction
 */

//CONTEST

/**
 * Sample transaction processor function.
 * @param {org.univote.addRace} addContest The sample transaction instance.
 * @transaction
 */

async function addContest(newContestData) {

    /*
		newContestData should include these:
		1. the variables to create teh object
		2. the election asset token: election
	*/

    // Get the JSON object with the new voter data
    let contestName = newContestData.electionName;
    let contestDescription = newContestData.contestDescription;
    let jurisdiction = newContestData.jurisdiction;
    let election = newContestData.election;

    // Create participant registry connection
    const ContestRegistry = await getAssetRegistry('org.univote.Contest');
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');

    // Create the unique voterId hash
    let contestId = helpers.createId()
    // Check the ID for existing ID

    let newContest = {
        'contestId' : contestId,
        'contestName' : contestName,
        'contestDescription' : contestDescription,
        'jurisdiction' : jurisdiction
    }

    // Add the contest asset to the blockchain
    await ContestRegistry.add(newContest);
    
    // Update the election asset
    let addedContest = await ContestRegistry.get(contestId)
    newContestData.election.contests.push(addedContest);
    await ElectionRegistry.update(newContestData.election)

    // Create the return value JSON
    returnValue = {
        'electionName' : election.electionName,
        'contestName' : addedContest.contestName,
        'contestDescription' : addedContest.contestDescription,
        'jurisdiction' : addedContest.jurisdiction
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateRace} updateContest The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteRace} deleteContest The sample transaction instance.
 * @transaction
 */

// CANDIDATE

/**
 * Sample transaction processor function.
 * @param {org.univote.addCandidate} addCandidate The sample transaction instance.
 * @transaction
 */

async function addCandidate(newCandidateData) {

    // Create participant registry connection
    const CandidateRegistry = await getAssetRegistry('org.univote.Candidate');
    const ContestRegistry = await getAssetRegistry('org.univote.Contest');

    // Create the unique voterId hash
    let candidateId = helpers.createId()
    // Check the ID for existing ID

    let newCandidate = {
        'candidateId' : candidateId,
        'candidate' : newCandidateData.voter,
    }

    // Add the candidate asset to the blockchain
    await CandidateRegistry.add(newCandidate);

    // Update the contest asset
    let addedCandidate = await CandidateRegistry.get(candidateId)
    newCandidateData.contest.CandidateRegistry.push(addedCandidate);
    await ContestRegistry.update(newCandidateData.contest)

    // Create the return value JSON
    let returnValue = {
        'firstName' : addedCandidate.voter.firstName,
        'lastName' : addedCandidate.voter.lasstName,
        'contest' : newCandidate.contest.contestName
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateCandidate} updateCandidate The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteCandidate} deleteCandidate The sample transaction instance.
 * @transaction
 */

// MEASURE

/**
 * Sample transaction processor function.
 * @param {org.univote.addMeasure} addMeasure The sample transaction instance.
 * @transaction
 */

async function addMeasue(newMeasureData) {

    // Create registry connections
    const MeasureRegistry = await getAssetRegistry('org.univote.Measure');
    const ElectionRegistry = await getAssetRegistry('org.univote.Election');

    // Create the unique voterId hash
    let MeasureId = helpers.createId()
    // Check the ID for existing ID

    let newMeasure = {
        'measureId' : newMeasureData.measureId,
        'measureName' : newMeasureData.measureName,
        'measureDescription' : newMeasureData.measureDescription,
        'jurisdiction' : newMeasureData.jurisdiction
    };

    // Add the measure asset to the blockchain
    await MeasureRegistry.add(newMeasure);

    // Update the Election asset
    let addedMeasure = await MeasureRegistry.get(measureId)
    newMeasureData.election.measures.push(addedMeasure);
    await ElectionRegistry.update(newMeasureData.election)


    // Create the return value JSON
    returnValue = {
        'measureName' : addedMeasure.measureName,
        'measureDescription' : addedMeasure.measureDescription,
        'jurisdiction' : addedMeasure.jurisdiction,
        'electionName' : newMeasureData.election.electionName
    };

    return returnValue;
 }

/**
 * Sample transaction processor function.
 * @param {org.univote.updateMeasure} updateMeasure The sample transaction instance.
 * @transaction
 */

/**
 * Sample transaction processor function.
 * @param {org.univote.deleteMeasure} deleteMeasure The sample transaction instance.
 * @transaction
 */




/* ****************** TRANSACTIONS  ****************** */

// VOTING

/**
 * Sample transaction processor function.
 * @param {org.univote.submitVote} submitVote The sample transaction instance.
 * @transaction
 */