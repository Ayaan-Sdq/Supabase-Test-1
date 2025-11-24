// Likely tailored to node.js or other plugins (?)
// import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://broxdgwwveecxkhremsz.supabase.co'

// I think this is tailored to node.js
// const supabaseKey = process.env.SUPABASE_KEY

// I'm using vanilla js (sue me) so I'm going to use the raw string
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3hkZ3d3dmVlY3hraHJlbXN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MTI4ODEsImV4cCI6MjA3ODQ4ODg4MX0.Jg-F9fRRRqI4_ZzBRzoTar6jHMQjC1dTali_jyWNw50';

// Create an anon role client. It has all anon restricts
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});

let clientSession = null;

// Make an event listener to restore the login state
window.addEventListener("DOMContentLoaded", async () => restoreLogInState());

// Creates account (program level)
async function signUp () {

    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let passwordRedo = document.getElementById("passwordRedoInput").value;
    let displayName = document.getElementById("displayNameInput").value;
    
    if (password !== passwordRedo) {
        alert("You didn't confirm the password accurately.");
        return;
    } else if (password.length < 6) {
        alert("Password must be longer than 6 words");
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email is invalid.");
        return;
    }

    await supabaseSignUp(email, password);

    // Add to the account tables as well
    await insertAccount(displayName);

    window.location.href = "index.html";

}

// Log into account (program level)
async function logIn () {

    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email is invalid.");
        return;
    } else if (password.length < 6) {
        alert("Password is longer than 6 words");
        return;
    }

    await supabaseSignIn(email, password);

}

// Log the account out (program level)
async function signOut() {

    await supabaseSignOut();

    window.location.href = "index.html";
    
}

// Insert an account to the table (database level)
async function insertAccount(display_name) {

    let {data, error} = await supabaseClient
    .from('accounts')
    .insert([
        {
            display_name
        }
    ]);

    if (error) {
        alert(`Error: ${error.name}: ${error.message}`);
        return;
    }

}

// Select info from an account (database level)
async function loadAccount() {

    let {data: sessionData} = await supabaseClient.auth.getSession();
    let uid = sessionData.session.user.id;

    let {data, error} = await supabaseClient
    .from('accounts')
    .select("*")
    .eq("uid", uid); // Should work fine if each user has one profile row

    if (error) {
        alert(`Error: ${error.name}: ${error.message}`);
        return;
    }

}

// Update profile info (database level)
async function updateAccount(column, value) {

    let {data: sessionData} = await supabaseClient.auth.getSession();
    let uid = sessionData.session.user.id;

    let updatingObj = {};
    updatingObj[column] = value;

    let { data, error } = await supabaseClient
    .from('accounts')
    .update(updatingObj)
    .eq("uid", uid);

    if (error) {
        alert(`Error: ${error.name}: ${error.message}`);
        return;
    }

    console.log("Profile updated:", data);

}

// Restore login state (supabase level)
async function restoreLogInState () {

    let { data: {session} } = await supabaseClient.auth.getSession();

    clientSession = session;

    // From loadAssets.js
    updateHTML();

}

// Sign up (supabase auth level)
async function supabaseSignUp (email, password) {

    let {data, error} = await supabaseClient.auth.signUp({
        email,
        password
    });

}

// Sign in (supabase level)
async function supabaseSignIn (email, password) {

    let {data, error} = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert(error.name, error.message);
        return;
    }

    window.location.href = "index.html";

}

// Log out
async function supabaseSignOut () {

    await supabaseClient.auth.signOut();

}