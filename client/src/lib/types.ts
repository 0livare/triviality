/**
 * The HTML autocomplete attribute lets web developers specify what if any
 * permission the user agent has to provide automated assistance in filling
 * out form field values, as well as guidance to the browser as to the type
 * of information expected in the field.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
 * See: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-field
 */
export type AutoCompleteValues =
  | 'off' // The browser is not permitted to automatically enter or select a value for this field. It is possible that the document or application provides its own autocomplete feature, or that security concerns require that the field's value not be automatically entered.
  | 'on' // The browser is allowed to automatically complete the input. No guidance is provided as to the type of data expected in the field, so the browser may use its own judgement.
  | 'name' // Full name	Free-form text, no newlines	Sir Timothy John Berners-Lee, OM, KBE, FRS, FREng, FRSA	Text
  | 'honorific-prefix' // Prefix or title (e.g. "Mr.", "Ms.", "Dr.", "Mlle")	Free-form text, no newlines	Sir	Text
  | 'given-name' // Given name (in some Western cultures, also known as the first name)	Free-form text, no newlines	Timothy	Text
  | 'additional-name' // Additional names (in some Western cultures, also known as middle names, forenames other than the first name)	Free-form text, no newlines	John	Text
  | 'family-name' // Family name (in some Western cultures, also known as the last name or surname)	Free-form text, no newlines	Berners-Lee	Text
  | 'honorific-suffix' // Suffix (e.g. "Jr.", "B.Sc.", "MBASW", "II")	Free-form text, no newlines	OM, KBE, FRS, FREng, FRSA	Text
  | 'nickname' // Nickname, screen name, handle: a typically short name used instead of the full name	Free-form text, no newlines	Tim	Text
  | 'organization-title' // Job title (e.g. "Software Engineer", "Senior Vice President", "Deputy Managing Director")	Free-form text, no newlines	Professor	Text
  | 'username' // A username	Free-form text, no newlines	timbl	Username
  | 'new-password' // A new password (e.g. when creating an account or changing a password)	Free-form text, no newlines	GUMFXbadyrS3	Password
  | 'current-password' // The current password for the account identified by the username field (e.g. when logging in)	Free-form text, no newlines	qwerty	Password
  | 'one-time-code' // One-time code used for verifying user identity	Free-form text, no newlines	123456	Password
  | 'organization' // Company name corresponding to the person, address, or contact information in the other fields associated with this field	Free-form text, no newlines	World Wide Web Consortium	Text
  | 'street-address' // Street address (multiple lines, newlines preserved)	Free-form text	32 Vassar Street
  | 'address-line1' // Street address (one line per field)	Free-form text, no newlines	32 Vassar Street	Text
  | 'address-line2' // Free-form text, no newlines	MIT Room 32-G524	Text
  | 'address-line3' // Free-form text, no newlines		Text
  | 'address-level4' // The most fine-grained administrative level, in addresses with four administrative levels	Free-form text, no newlines		Text
  | 'address-level3' // The third administrative level, in addresses with three or more administrative levels	Free-form text, no newlines		Text
  | 'address-level2' // The second administrative level, in addresses with two or more administrative levels; in the countries with two administrative levels, this would typically be the city, town, village, or other locality within which the relevant street address is found	Free-form text, no newlines	Cambridge	Text
  | 'address-level1' // The broadest administrative level in the address, i.e. the province within which the locality is found; for example, in the US, this would be the state; in Switzerland it would be the canton; in the UK, the post town	Free-form text, no newlines	MA	Text
  | 'country' // Country code	Valid ISO 3166-1-alpha-2 country code [ISO3166]	US	Text
  | 'country-name' // Country name	Free-form text, no newlines; derived from country in some cases	US	Text
  | 'postal-code' // Postal code, post code, ZIP code, CEDEX code (if CEDEX, append "CEDEX", and the arrondissement, if relevant, to the address-level2 field)	Free-form text, no newlines	02139	Text
  | 'cc-name' // Full name as given on the payment instrument	Free-form text, no newlines	Tim Berners-Lee	Text
  | 'cc-given-name' // Given name as given on the payment instrument (in some Western cultures, also known as the first name)	Free-form text, no newlines	Tim	Text
  | 'cc-additional-name' // Additional names given on the payment instrument (in some Western cultures, also known as middle names, forenames other than the first name)	Free-form text, no newlines		Text
  | 'cc-family-name' // Family name given on the payment instrument (in some Western cultures, also known as the last name or surname)	Free-form text, no newlines	Berners-Lee	Text
  | 'cc-number' // Code identifying the payment instrument (e.g. the credit card number)	ASCII digits	4114360123456785	Text
  | 'cc-exp' // Expiration date of the payment instrument	Valid month string	2014-12	Month
  | 'cc-exp-month' // Month component of the expiration date of the payment instrument	Valid integer in the range 1..12	12	Numeric
  | 'cc-exp-year' // Year component of the expiration date of the payment instrument	Valid integer greater than zero	2014	Numeric
  | 'cc-csc' // Security code for the payment instrument (also known as the card security code (CSC), card validation code (CVC), card verification value (CVV), signature panel code (SPC), credit card ID (CCID), etc.)	ASCII digits	419	Text
  | 'cc-type' // Type of payment instrument	Free-form text, no newlines	Visa	Text
  | 'transaction-currency' // The currency that the user would prefer the transaction to use	ISO 4217 currency code [ISO4217]	GBP	Text
  | 'transaction-amount' // The amount that the user would like for the transaction (e.g. when entering a bid or sale price)	Valid floating-point number	401.00	Numeric
  | 'language' // Preferred language	Valid BCP 47 language tag [BCP47]	en	Text
  | 'bday' // Birthday	Valid date string	1955-06-08	Date
  | 'bday-day' // Day component of birthday	Valid integer in the range 1..31	8	Numeric
  | 'bday-month' // Month component of birthday	Valid integer in the range 1..12	6	Numeric
  | 'bday-year' // Year component of birthday	Valid integer greater than zero	1955	Numeric
  | 'sex' // Gender identity (e.g. Female, Fa'afafine)	Free-form text, no newlines	Male	Text
  | 'url' // Home page or other web page corresponding to the company, person, address, or contact information in the other fields associated with this field	Valid URL string	https://www.w3.org/People/Berners-Lee/	URL
  | 'photo' // Photograph, icon, or other image corresponding to the company, person, address, or contact information in the other fields associated with this field	Valid URL string	https://www.w3.org/Press/Stock/Berners-Lee/2001-europaeum-eighth.jpg	URL
  | 'tel' // Full telephone number, including country code	ASCII digits and U+0020 SPACE characters, prefixed by a U+002B PLUS SIGN character (+)	+1 617 253 5702	Tel
  | 'tel-country-code' // Country code component of the telephone number	ASCII digits prefixed by a U+002B PLUS SIGN character (+)	+1	Text
  | 'tel-national' // Telephone number without the county code component, with a country-internal prefix applied if applicable	ASCII digits and U+0020 SPACE characters	617 253 5702	Text
  | 'tel-area-code' // Area code component of the telephone number, with a country-internal prefix applied if applicable	ASCII digits	617	Text
  | 'tel-local' // Telephone number without the country code and area code components	ASCII digits	2535702	Text
  | 'tel-local-prefix' // First part of the component of the telephone number that follows the area code, when that component is split into two components	ASCII digits	253	Text
  | 'tel-local-suffix' // Second part of the component of the telephone number that follows the area code, when that component is split into two components	ASCII digits	5702	Text
  | 'tel-extension' // Telephone number internal extension code	ASCII digits	1000	Text
  | 'email' // Email address	Valid email address	timbl@w3.org	Username
  | 'impp' // URL representing an instant messaging protocol endpoint
