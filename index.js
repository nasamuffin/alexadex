/**
 * Alexadex
 *
 * Author: Emily Shaffer
 * Looks up Pokemon strengths and weaknesses
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
         }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
                + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
                + ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
                + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("WeaknessesIntent" === intentName) {
        getWeaknessesForType(intent, session, callback);
    } else if ("StrengthsIntent" === intentName) {
        getStrengthsForType(intent, session, callback);
    } else if ("HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
                + ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

var weaknesses = {
    "normal":   ["fighting"],
    "fighting": ["flying", "psychic", "fairy"],
    "flying":   ["rock", "electric", "ice"],
    "poison":   ["ground", "psychic"],
    "ground":   ["water", "grass", "ice"],
    "rock":     ["fighting", "ground", "steel", "water", "grass"],
    "bug":      ["flying", "rock", "fire"],
    "ghost":    ["ghost", "dark"],
    "steel":    ["fighting", "ground", "fire"],
    "fire":     ["ground", "rock", "fire"],
    "water":    ["grass", "electric"],
    "grass":    ["flying", "poison", "bug", "fire", "ice"],
    "electric": ["ground"],
    "psychic":  ["bug", "ghost", "dark"],
	"ice":		["fighting", "rock", "steel", "fire"],
    "dragon":   ["ice", "dragon", "fairy"],
    "dark":     ["fighting", "bug", "fairy"],
    "fairy":    ["poison", "steel"]
}

var strengths = {
	"normal":   [],
    "fighting": ["normal", "rock", "steel", "ice", "dark"],
    "flying":   ["fighting", "bug", "grass"],
    "poison":   ["grass"],
    "ground":   ["poison", "rock", "steel", "fire", "electric"],
    "rock":     ["flying", "bug", "fire", "ice"],
    "bug":      ["grass", "psychic", "dark"],
    "ghost":    ["ghost", "psychic"],
    "steel":    ["rock", "ice", "fairy"],
    "fire":     ["bug", "steel", "grass", "ice"],
    "water":    ["ground", "rock", "fire"],
    "grass":    ["ground", "rock", "water"],
    "electric": ["flying", "water"],
    "psychic":  ["fighting", "poison"],
	"ice":		["flying", "ground", "grass", "dragon"],
    "dragon":   ["ice"],
    "dark":     ["bug", "psychic"],
    "fairy":    ["fighting", "dragon", "dark"]
}

function naturalTypeList(types, capitalize) {
	phrase = "";
	if (types.length == 1) {
		phrase = types[0];
	}
	else if (types.length == 0) {
		phrase = "no types";
	}
	else {
		for (var type in types) {
			if (type == types.length - 1) {
				phrase += " and " + types[type];
			}
			else {
				phrase += types[type] + ", ";
			}
		}
	}
	
	return phrase;
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1);
}

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to Alexadex, "
				+ "I can tell you what a type's strengths and weaknesses are "
                + "if you say, "
                + "What are grass's weaknesses?";
    // Tell help and exit.
    var repromptText = null;
    var shouldEndSession = true;

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Displays which types are super-effective against the given type
 */
function getWeaknessesForType(intent, session, callback) {
    var cardTitle = "Weaknesses";
    var typeSlot = intent.slots.Type;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

	if (typeSlot && typeSlot.value in weaknesses) {
		cardTitle += " of " + typeSlot.value;
		var weakList = naturalTypeList(weaknesses[typeSlot.value], true);
		speechOutput = capitalize(weakList) + " attacks are super effective against " + typeSlot.value + ".";
	}

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

/**
 * Displays which types the given type is super-effective against
 */
function getStrengthsForType(intent, session, callback) {
    var cardTitle = "Strengths";
    var typeSlot = intent.slots.Type;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = true;
    var speechOutput = "";

	if (typeSlot && typeSlot.value in strengths) {
		cardTitle += " of " + typeSlot.value;
		var strongList = naturalTypeList(strengths[typeSlot.value], false);
		speechOutput = capitalize(typeSlot.value) + " attacks are super effective against " + strongList + ".";
	}

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    }
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }
}
