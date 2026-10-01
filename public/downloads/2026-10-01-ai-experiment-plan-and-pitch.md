# AI Workplace Experiment Plan and Proposal Pitch

**Opportunity:** AI-assisted cleaning of CRM organisation (Account) records
**Status:** Plan only. Nothing has been run, and no tool has been introduced.
**Purpose:** the aim is an accurate, efficient and repeatable routine for maintaining Cycling UK's range of datasets, not a one-off clean-up. The largest is the membership dataset, which stays at about 70,000 records. This test is the small, safe first step that shows whether the approach works before any real data is involved.

---

## Task 1: Workplace Experiment Plan

**I want to test…**
whether an AI assistant can speed up two stages of cleaning CRM organisation records, *standardise* and *flag*, without losing accuracy. The AI will get a column profile and a sample. It will propose cleaning rules and write a Python script, and I will run that script locally. The script fixes country spellings and letter case, turns the literal text "NULL" into real blanks, and flags likely duplicates, test records and impossible values. The AI never edits or deletes data itself.

**The people involved will be…**
- me, running the test and timing both methods
- my line manager, who sponsors the test and reviews the result
- a colleague from the CRM team, who acts as an independent second reviewer of the AI's proposed rules and flags

**I need approval from…**
- my line manager, to spend the time and agree the scope
- the CRM data owner, to confirm that the fictional dataset matches our real fields and to agree that nothing goes near the live CRM
- the data protection / information governance lead (or whoever owns the AI policy), to confirm that an AI tool may be used with fictional data and that the tool I choose is allowed

**I will use this fictional, anonymised or approved test data…**
a made-up dataset of 50 organisation records, small enough to clean by hand in about an hour. A script will generate it with the same column layout as our CRM Account table. All names, emails, addresses and IDs are invented. I will deliberately plant the problems I found when profiling the real export, so I know every "right answer" in advance:
- about 6 different spellings of the country, e.g. "UK", "Untied Kingdom" and "GB"
- blank cells stored as the text "NULL"
- groups of duplicates that differ only in case, spacing or punctuation
- test records and job titles saved as organisation names
- impossible founding years such as 0 and 3000
- shortened postcodes and ALL-CAPS names

No real CRM data is used in the test. The real export is used only by me, on my own machine, to copy the column headings and the types and rough numbers of problems. It is never given to the AI tool, and none of its records are copied into the test datasets. Using the real data with AI would need a separate, approved request.

**I will compare the AI-supported task with…**
the same task done manually on an identical copy of the dataset, using spreadsheet filters, sorting and find-and-replace. That is how it would be done today without AI. To reduce any learning effect, I will create two equivalent datasets (A and B) with the same number and types of planted problems. I'll do the manual method on A and the AI-supported method on B.

**I will measure…**
- **Time:** total minutes per method. For the AI method, this includes writing prompts, reviewing output and fixing mistakes.
- **Issues found:** the percentage of planted problems correctly found or fixed, measured against the answer key
- **False flags:** the number of records wrongly changed or flagged
- **Human corrections:** how many AI-proposed rules or flags the reviewers rejected or changed
- **Prompt revisions:** how many times I had to revise the prompt to get usable output
- **Reviewer confidence:** a 1–5 rating from the second reviewer on whether they would trust the output
- **Repeatability:** once the AI-supported method is finished on dataset B, I run the same script, unchanged, on dataset A and score it against A's answer key. This shows whether the rules work on new data or only on the data they were written for.

**A successful result would be…**
- the AI-supported method finds **at least 90%** of planted problems, with **no more than 5%** false flags
- it takes **at least 30% less time** than the manual method, including review
- the unchanged script still finds **at least 90%** of planted problems on dataset A, which shows the routine can be repeated on new data
- **zero** records are deleted or merged without a person approving them
- **no** personal or confidential data enters the AI tool

**A person will review…**
- **before running:** I review every rule and the whole script the AI proposes before running any of it
- **low-risk changes** (spacing, letter case, "NULL" to blank): the second reviewer checks a random sample of 10
- **medium-risk changes** (test records, invalid values): the second reviewer reads the full flag list
- **high-risk changes** (possible duplicates or merges): a person approves every group. The AI only suggests; it never decides.
- **final result:** my line manager reviews the scores and decides whether a further, approved test is worthwhile

**I will stop the test if…**
- any real, personal or confidential data appears in an AI input or output
- the AI output deletes records, changes record IDs or overwrites the original file
- the AI-supported method is clearly less accurate than the manual method after two prompt revisions
- the tool's terms, or its approval for this use, turn out to be unclear
- the test goes beyond the agreed time limit (about 3 hours in total)

**I will record the result by…**
- keeping a test log with every prompt (original and revised), every AI output, the timings and the scores against the answer key
- keeping a change log listing each change: record, column, old value, new value, the rule applied and who approved it
- writing a one-page summary for my line manager with the results, what went wrong and a recommendation
- writing a learning-log entry on my portfolio site and recording the off-the-job hours

### Why the test is small, and the route to a repeatable routine

Cleaning 70,000 membership records by hand isn't realistic: at the pace of the manual test (50 records in about an hour), it would take over 1,000 hours, and the job would have to be repeated as new data comes in. A cleaning script that has been checked runs on 70,000 records as easily as on 50. It can also be rerun on a schedule and adapted to other datasets. So the real question is whether AI can help write correct, reusable rules quickly. That is what this test measures. The work that grows with the data is **human review**, especially of possible duplicates. That's the main thing to plan for when scaling up.

Each stage below needs this test to succeed and its own approval:

1. **This test:** 50 fictional records. The rules and script are proven against a known answer key.
2. **Larger fictional test:** a few thousand generated records, to check speed and how much the duplicate review grows.
3. **Real data, run locally:** the approved script runs on a copy of the membership export on an approved machine. The AI never sees the records. This needs sign-off from the data protection lead and the CRM data owner.
4. **Sandbox CRM:** fixes are applied in a test copy of Dynamics and checked by the CRM team.
5. **Live CRM:** fixes are applied in logged batches using Dynamics' own tools. Duplicates are merged with Dynamics Merge so linked records aren't lost, and every merge is approved by a person.

---

## Task 2: 60-Second Proposal Pitch (for Slack)

> I propose testing AI to support **cleaning our CRM organisation records** because **profiling an export showed that about 60% of the columns are empty or hold a single value, with over 550 likely duplicate groups and 27 spellings of the country, and fixing this by hand is slow and error-prone.**
> The expected business value is **faster, more consistent data cleaning, so reports and automations can rely on the CRM. The aim is a repeatable routine for maintaining all our datasets, the largest being membership at about 70,000 records, which is far too many to keep clean by hand. A small test on fictional data shows whether AI-written cleaning rules are accurate enough to build that routine on.**
> The main risk is **AI making confident mistakes, or personal data reaching an unapproved tool**, which I would control by **testing only on fictional data with a known answer key, having the AI write code that runs locally rather than handing it data, and having a person approve every merge or deletion.**
> A human would remain responsible for **approving every change, deciding on duplicates, and any decision to go near the live CRM.**
> My next step is **getting sign-off from my manager and the CRM data owner, then building the fictional test dataset.**

### Reply to another learner (template)

> **What's convincing:** [e.g. "You've tied it to a measurable cost: X hours a week spent on Y makes the value easy to see."]
> **Open question:** [e.g. "How will you know the AI's output is correct? What are you comparing it against?" / "Who approves the tool for that kind of data?" / "What happens if the AI is wrong and nobody spots it?"]

Strong questions usually probe one of these: the **baseline** (compared to what?), **data** (is it really safe or approved?), **human review** (who checks, and how much?) or **success** (what number counts as a win?).

---

## Before the next session: dataset and data-quality problem

- **Dataset:** the CRM (Microsoft Dynamics 365) Account table, which holds the organisation records: clubs, partners and suppliers.
- **Data-quality problem:** blank values stored as the literal text "NULL". A spreadsheet counts these cells as filled, so the data looks far more complete than it is, and every completeness check gives a wrong answer. (Other examples, if needed: 27 spellings of the country, and duplicate organisations that differ only in case or punctuation.)
- Describe it with counts and made-up examples only. Don't bring real records.
