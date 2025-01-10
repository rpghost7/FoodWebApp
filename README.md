# Important things to note
Below are-
#Paypal Gateway
I have added paypal gateway using paypal sandbox, if you want to check it you can use your paypal sandbox account or an actual account to verify it
It requires a US based customer as the paypal api was only available for US, I tried other ways but couldn't quite find it

# Twilio API
I did integrate twilio for otp generation when the user sign ups, but in the signup page i didn't make a phone number input option
as I used the free version of twilio which can only send otps on my own number and not others, so there was technically no point in doing that.
Similarly in the backend i have hard coded my phone number for the above reason, although it is quite easy to take input phone number as request and accordingly
go forward with the responses

Other API credentials of twilio and paypal can be taken by making an account and verifying it yourself by making changes in code where it is required

