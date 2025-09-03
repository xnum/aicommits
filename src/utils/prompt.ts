import type { CommitType } from './config.js';

const commitTypeFormats: Record<CommitType, string> = {
	'': '<commit message>',
	conventional: '<type>(<optional scope>): <commit message>',
};
const specifyCommitFormat = (type: CommitType) =>
	`The output response must be in format:\n${commitTypeFormats[type]}`;

const commitTypes: Record<CommitType, string> = {
	'': '',

	/**
	 * References:
	 * Commitlint:
	 * https://github.com/conventional-changelog/commitlint/blob/18fbed7ea86ac0ec9d5449b4979b762ec4305a92/%40commitlint/config-conventional/index.js#L40-L100
	 *
	 * Conventional Changelog:
	 * https://github.com/conventional-changelog/conventional-changelog/blob/d0e5d5926c8addba74bc962553dd8bcfba90e228/packages/conventional-changelog-conventionalcommits/writer-opts.js#L182-L193
	 */
	conventional: `Choose a type from the type-to-description JSON below that best describes the git diff:\n${JSON.stringify(
		{
			docs: 'Documentation only changes',
			style:
				'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
			refactor: 'A code change that neither fixes a bug nor adds a feature',
			perf: 'A code change that improves performance',
			test: 'Adding missing tests or correcting existing tests',
			build: 'Changes that affect the build system or external dependencies',
			ci: 'Changes to our CI configuration files and scripts',
			chore: "Other changes that don't modify src or test files",
			revert: 'Reverts a previous commit',
			feat: 'A new feature',
			fix: 'A bug fix',
		},
		null,
		2
	)}`,
};

export const generatePrompt = (
	locale: string,
	maxLength: number,
	type: CommitType,
	draft: string
  ) => {
	return `
  Instructions:
  
  0. Understand the Draft and Intention
	 - Draft: \`${draft}\`
	 - Intention: Ensure the commit message aligns with the provided draft and goals.

  1. Gerrit friendly
     - We use gerrit for reviewing code. Some fields will be generated automatically e.g. Change-Id, Reviewed-By. Do Not include these fields in the commit message. 

  2. Commit Message Structure:
	 - Header: \`<component>: <subject>\` (Totally less than 60 characters, ideally 40-50)
	 - Body: Detailed explanation (better to have)

  3. Guidelines:
     - Component:
	   - Specifies the module or area or executable affected by the commit, such as auth, ui, or database.
	 - Subject:
	   - Summarize the change in imperative mood (e.g., "add user login feature").
	   - Use lower alphabet.
	   - Do not exceed 50 characters.
	   - Avoid ending with a period.
	   - Avoid using generic or filler phrases. Keep the subject clear and concise.
       - Explain why we did this change. Is this change was trying to fix something? developing some features? adding some missing parts? Guess author's intention and describe it. If it's in a chat, please ask anything if you find it confused. What is the problem if we don't have this change?

	 - Body:
	   - Separate from the subject with one empty line.
	   - Wrap lines at 80 characters.
	   - Explain the "why" and "how" of the change.
	   - Avoid redundant statements. Focus on essential details.

  4. Style:
	- Use Clear and Concise Language:
		- Opt for simple and direct words.
		- Avoid unnecessary jargon or technical terms unless essential.
	- Use Active Voice:
		- Write in the active voice to make statements clearer (e.g., "Fix bug" instead of "Bug fixed").
	- Be Specific and Direct:
		- Clearly state what was changed and why.
		- Avoid vague descriptions.
	- Use Plain Text:
	    - Avoid MarkDown language.
	- Maintain Consistent Tone:
		- Use a professional and neutral tone.
	- Avoid Redundancy:
		- Do not repeat information.
		- Eliminate filler words and phrases.
	- Structure Information Logically:
		- Present information in a logical order, typically starting with what was changed, followed by why and how.
	- Limit Sentence Length:
		- Keep sentences short and to the point to enhance readability.
	- Avoid Unnecessary Phrases:
		- Do not include phrases like "This enhancement improves..." or "This update allows..."
	- Ensure Proper Grammar and Punctuation:
		- Use correct grammar to maintain professionalism.
    - Proper punctuation helps in conveying the message clearly.

  5. Output:
	 - Provide the commit message following the Gerrit style.
	 - Ensure the subject line is concise and within the specified character limit.

  Example Format:

  <component>: <subject>

  <body>

  Special Rules for Components: 
  
  This is a list to let you describe component precisely. Sometimes multiple rules are matched, 
  in this case you should find the most relevant one.

  - \`tenant/option\` \`tenant/future\` \`tenant/stock\` for changes related to optioncore, futurecore, stockcore.
  - \`cockpit/hestia\` for changes in hestia.
  - \`tenant\` for changes related to tenant itself and not its cores.
  - \`lib/[placeholder]\` \`pkg/[placeholder]\` \`internal/[placeholder]\` for libraries.
  - \`app/[placeholder]\` \`appmodule/[placeholder]\` for certain app or appmodule.
  - \`health\` \`database\` \`logging\` \`cache\` for singleton packages.
  
  Your Task:
  Using the above guidelines and the provided draft, generate a well-structured Gerrit-style commit message. Ensure the subject line is concise and within the specified character limit.
  
  ${draft}
  `;
  };