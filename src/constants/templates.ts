export const templates = [
    { 
        id: "blank", 
        label: "Blank Document", 
        imageurl: "/blank-document.svg",
        initialContent: ""
    },
    {
        id: "software-proposal", 
        label: "Software Development Proposal", 
        imageurl: "/software-proposal.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a2e; max-width: 800px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 48px 56px; margin-bottom: 40px; border-radius: 4px;">
                    <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #a0aec0; margin-bottom: 12px;">Software Development</p>
                    <h1 style="font-size: 36px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.2;">Project Proposal</h1>
                    <div style="width: 48px; height: 3px; background: #4fc3f7; margin-bottom: 24px;"></div>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 4px 0; color: #a0aec0; font-size: 13px; width: 120px;">Prepared by</td>
                            <td style="padding: 4px 0; color: white; font-size: 13px;">[Your Name / Company]</td>
                            <td style="padding: 4px 0; color: #a0aec0; font-size: 13px; width: 80px;">Date</td>
                            <td style="padding: 4px 0; color: white; font-size: 13px;">[Date]</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #a0aec0; font-size: 13px;">Client</td>
                            <td style="padding: 4px 0; color: white; font-size: 13px;">[Client Name]</td>
                            <td style="padding: 4px 0; color: #a0aec0; font-size: 13px;">Version</td>
                            <td style="padding: 4px 0; color: white; font-size: 13px;">1.0</td>
                        </tr>
                    </table>
                </div>

                <div style="padding: 0 8px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">1. Executive Summary</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Provide a brief overview of the proposed software solution, its purpose, and the value it delivers to the client.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">2. Project Objectives</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Outline the key goals and objectives of the software development project.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">3. Scope of Work</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Describe the features, modules, and deliverables included in this proposal.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">4. Technical Approach</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Explain the technologies, frameworks, and methodology that will be used.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">5. Timeline</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Provide an estimated project schedule with milestones and deadlines.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">6. Budget</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">Include a cost breakdown for the project, including development, testing, and deployment.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">7. Team</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">List the key personnel involved in the project and their roles.</p>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <div style="width: 6px; height: 28px; background: #4fc3f7; border-radius: 3px;"></div>
                        <h2 style="font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0;">8. Terms & Conditions</h2>
                    </div>
                    <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px; padding-left: 18px;">State the payment terms, intellectual property rights, and any other relevant conditions.</p>
                </div>
            </div>
        `
    },
    {
        id: "project-proposal", 
        label: "Project Proposal", 
        imageurl: "/project-proposal.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 800px; margin: 0 auto;">
                <div style="border-top: 6px solid #2d6a4f; padding: 40px 0 32px 0; margin-bottom: 40px;">
                    <p style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #2d6a4f; margin-bottom: 12px;">Project Proposal</p>
                    <h1 style="font-size: 40px; font-weight: 700; margin: 0 0 24px 0; line-height: 1.1; color: #1a1a1a;">[Project Name]</h1>
                    <div style="display: flex; gap: 32px;">
                        <div><p style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Submitted By</p><p style="font-size: 14px; color: #1a1a1a; margin: 0;">[Your Name]</p></div>
                        <div><p style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Date</p><p style="font-size: 14px; color: #1a1a1a; margin: 0;">[Date]</p></div>
                        <div><p style="font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px 0;">Department</p><p style="font-size: 14px; color: #1a1a1a; margin: 0;">[Department]</p></div>
                    </div>
                </div>

                <div style="background: #f0faf4; border-left: 4px solid #2d6a4f; padding: 20px 24px; margin-bottom: 36px; border-radius: 0 4px 4px 0;">
                    <h2 style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #2d6a4f; margin: 0 0 8px 0;">Project Overview</h2>
                    <p style="color: #4a5568; line-height: 1.8; margin: 0;">Provide a summary of the project, its purpose, and the problem it aims to solve.</p>
                </div>

                <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Goals & Objectives</h2>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">List the specific, measurable goals this project will achieve.</p>

                <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Deliverables</h2>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">Describe the tangible outcomes and deliverables expected at the end of the project.</p>

                <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Timeline</h2>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">Outline the project phases, key milestones, and estimated completion dates.</p>

                <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Budget</h2>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">Provide an estimated budget with a breakdown of costs.</p>

                <h2 style="font-size: 16px; font-weight: 700; color: #1a1a1a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Risk Assessment</h2>
                <p style="color: #4a5568; line-height: 1.8; margin-bottom: 32px;">Identify potential risks and mitigation strategies.</p>

                <div style="background: #1a1a1a; color: white; padding: 24px 32px; border-radius: 4px; margin-top: 48px;">
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #2d6a4f; margin: 0 0 8px 0;">Conclusion</h2>
                    <p style="color: #e2e8f0; line-height: 1.8; margin: 0;">Summarize the proposal and include a call to action for approval.</p>
                </div>
            </div>
        `
    },
    {
        id: "business-letter", 
        label: "Business Letter", 
        imageurl: "/business-letter.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 720px; margin: 0 auto;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0;">
                    <div>
                        <p style="font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0 0 4px 0;">[Your Name]</p>
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Your Title] · [Company Name]</p>
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Address], [City, State, ZIP]</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Phone Number]</p>
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Email Address]</p>
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Date]</p>
                    </div>
                </div>

                <div style="margin-bottom: 40px;">
                    <p style="font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 0 0 2px 0;">[Recipient Name]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Recipient Title]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Company Name]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Address], [City, State, ZIP]</p>
                </div>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 24px;">Dear [Recipient Name],</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">I am writing to [state the purpose of the letter]. [Provide relevant background or context in this paragraph.]</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">[Expand on the main point. Include any supporting details, data, or arguments.]</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 48px;">[Closing paragraph: summarize your request or key message and include a call to action.]</p>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 48px;">Sincerely,</p>

                <div style="border-top: 2px solid #1a1a1a; padding-top: 12px; width: 200px;">
                    <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0 0 2px 0;">[Your Name]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Your Title]</p>
                </div>
            </div>
        `
    },
    {
        id: "resume", 
        label: "Resume", 
        imageurl: "/resume.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 800px; margin: 0 auto;">
                <div style="text-align: center; padding: 40px 0 32px; border-bottom: 3px solid #1a1a1a; margin-bottom: 32px;">
                    <h1 style="font-size: 42px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px 0;">[Your Full Name]</h1>
                    <p style="font-size: 13px; color: #718096; letter-spacing: 1px; margin: 0;">[Phone] &nbsp;·&nbsp; [Email] &nbsp;·&nbsp; [LinkedIn] &nbsp;·&nbsp; [Portfolio]</p>
                </div>

                <div style="margin-bottom: 28px;">
                    <h2 style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #718096; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">Summary</h2>
                    <p style="font-size: 14px; color: #4a5568; line-height: 1.8; margin: 0;">A brief 2-3 sentence summary highlighting your experience, skills, and career goals.</p>
                </div>

                <div style="margin-bottom: 28px;">
                    <h2 style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #718096; margin: 0 0 16px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">Experience</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <p style="font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0;">[Job Title]</p>
                            <p style="font-size: 13px; color: #718096; margin: 0;">[Start] – [End]</p>
                        </div>
                        <p style="font-size: 13px; color: #4a5568; font-style: italic; margin: 0 0 8px 0;">[Company Name], [Location]</p>
                        <ul style="margin: 0; padding-left: 18px; color: #4a5568; font-size: 14px; line-height: 1.8;">
                            <li>Key responsibility or achievement</li>
                            <li>Key responsibility or achievement</li>
                            <li>Key responsibility or achievement</li>
                        </ul>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <p style="font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0;">[Job Title]</p>
                            <p style="font-size: 13px; color: #718096; margin: 0;">[Start] – [End]</p>
                        </div>
                        <p style="font-size: 13px; color: #4a5568; font-style: italic; margin: 0 0 8px 0;">[Company Name], [Location]</p>
                        <ul style="margin: 0; padding-left: 18px; color: #4a5568; font-size: 14px; line-height: 1.8;">
                            <li>Key responsibility or achievement</li>
                            <li>Key responsibility or achievement</li>
                        </ul>
                    </div>
                </div>

                <div style="margin-bottom: 28px;">
                    <h2 style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #718096; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">Education</h2>
                    <div style="display: flex; justify-content: space-between;">
                        <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">[Degree] — [University Name]</p>
                        <p style="font-size: 13px; color: #718096; margin: 0;">[Year]</p>
                    </div>
                </div>

                <div style="margin-bottom: 28px;">
                    <h2 style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #718096; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">Skills</h2>
                    <p style="font-size: 14px; color: #4a5568; margin: 0;">[Skill 1] &nbsp;·&nbsp; [Skill 2] &nbsp;·&nbsp; [Skill 3] &nbsp;·&nbsp; [Skill 4] &nbsp;·&nbsp; [Skill 5]</p>
                </div>

                <div>
                    <h2 style="font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #718096; margin: 0 0 12px 0; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0;">Certifications</h2>
                    <p style="font-size: 14px; color: #4a5568; margin: 0;">[Certification Name] — [Issuing Organization], [Year]</p>
                </div>
            </div>
        `
    },
    {
        id: "cover-letter", 
        label: "Cover Letter", 
        imageurl: "/cover-letter.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 720px; margin: 0 auto;">
                <div style="background: #1a1a2e; color: white; padding: 32px 40px; margin-bottom: 48px; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="font-size: 20px; font-weight: 700; margin: 0 0 4px 0;">[Your Name]</p>
                            <p style="font-size: 13px; color: #a0aec0; margin: 0;">[Email] &nbsp;·&nbsp; [Phone] &nbsp;·&nbsp; [City, State]</p>
                        </div>
                        <p style="font-size: 13px; color: #a0aec0; margin: 0;">[Date]</p>
                    </div>
                </div>

                <div style="margin-bottom: 36px;">
                    <p style="font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 0 0 2px 0;">[Hiring Manager's Name]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Company Name] · [Company Address]</p>
                </div>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 28px;">Dear [Hiring Manager's Name],</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">I am excited to apply for the <strong style="color: #1a1a1a;">[Job Title]</strong> position at <strong style="color: #1a1a1a;">[Company Name]</strong>. With my background in [relevant field/experience], I am confident in my ability to contribute effectively to your team.</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">In my previous role at [Previous Company], I [describe a key achievement or responsibility]. This experience has equipped me with [specific skills] that align well with the requirements of this position.</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">I am particularly drawn to [Company Name] because of [specific reason]. I am eager to bring my skills in [key skill] to help achieve [relevant goal].</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 48px;">Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.</p>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 40px;">Sincerely,</p>

                <div style="border-top: 2px solid #1a1a2e; padding-top: 12px; width: 200px;">
                    <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">[Your Name]</p>
                </div>
            </div>
        `
    },
    {
        id: "letter", 
        label: "Letter", 
        imageurl: "/letter.svg",
        initialContent: `
            <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 680px; margin: 0 auto;">
                <div style="text-align: right; margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid #e2e8f0;">
                    <p style="font-size: 14px; color: #1a1a1a; font-weight: 600; margin: 0 0 4px 0;">[Your Name]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[Address]</p>
                    <p style="font-size: 13px; color: #718096; margin: 0;">[City, State, ZIP]</p>
                    <p style="font-size: 13px; color: #718096; margin: 8px 0 0 0;">[Date]</p>
                </div>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 28px;">Dear [Recipient's Name],</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">I hope this letter finds you well. I am writing to [state the purpose of your letter].</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">[Main body of the letter. Include relevant details, context, or information you want to convey.]</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 20px;">[Optional second paragraph for additional details or a follow-up point.]</p>

                <p style="font-size: 15px; color: #4a5568; line-height: 1.9; margin-bottom: 52px;">Thank you for your time. Please feel free to reach out if you have any questions.</p>

                <p style="font-size: 15px; color: #1a1a1a; margin-bottom: 40px;">Warm regards,</p>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; width: 180px;">
                    <p style="font-size: 14px; font-weight: 700; color: #1a1a1a; margin: 0;">[Your Name]</p>
                </div>
            </div>
        `
    }
];