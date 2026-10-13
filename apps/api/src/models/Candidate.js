import pool, { getIsConnected } from "../db/index.js";

// In-memory fallback if database is temporarily unavailable
let inMemoryCandidates = [];

const Candidate = {
  async create(data) {
    const {
      fullName,
      mobileNumber,
      email,
      currentLocation,
      highestQualification,
      totalExperience,
      currentCompany,
      currentDesignation,
      skills,
      profileCategory,
      preferredRole,
      preferredLocation,
      currentCtc,
      expectedCtc,
      noticePeriod,
      linkedinUrl,
      resumeFilename = null,
      resumeData = null,
      resumeMimeType = null,
      status = "New",
      notes = null,
    } = data;

    if (getIsConnected()) {
      const queryText = `
        INSERT INTO candidates (
          full_name,
          mobile_number,
          email,
          current_location,
          highest_qualification,
          total_experience,
          current_company,
          current_designation,
          skills,
          profile_category,
          preferred_role,
          preferred_location,
          current_ctc,
          expected_ctc,
          notice_period,
          linkedin_url,
          resume_filename,
          resume_data,
          resume_mime_type,
          status,
          notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        RETURNING *;
      `;
      const values = [
        fullName.trim(),
        mobileNumber.trim(),
        email.toLowerCase().trim(),
        currentLocation.trim(),
        highestQualification.trim(),
        totalExperience?.trim() || "Fresher",
        currentCompany?.trim() || null,
        currentDesignation?.trim() || null,
        skills?.trim() || "",
        profileCategory?.trim() || "General",
        preferredRole?.trim() || null,
        preferredLocation?.trim() || currentLocation.trim(),
        currentCtc?.trim() || null,
        expectedCtc?.trim() || null,
        noticePeriod?.trim() || null,
        linkedinUrl?.trim() || null,
        resumeFilename,
        resumeData,
        resumeMimeType,
        status,
        notes,
      ];

      const res = await pool.query(queryText, values);
      const row = res.rows[0];
      return formatRow(row);
    } else {
      const fallbackEntry = {
        _id: `mem-${Date.now()}`,
        id: `mem-${Date.now()}`,
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.toLowerCase().trim(),
        currentLocation: currentLocation.trim(),
        highestQualification: highestQualification.trim(),
        totalExperience: totalExperience?.trim() || "Fresher",
        currentCompany: currentCompany?.trim() || null,
        currentDesignation: currentDesignation?.trim() || null,
        skills: skills?.trim() || "",
        profileCategory: profileCategory?.trim() || "General",
        preferredRole: preferredRole?.trim() || null,
        preferredLocation: preferredLocation?.trim() || currentLocation.trim(),
        currentCtc: currentCtc?.trim() || null,
        expectedCtc: expectedCtc?.trim() || null,
        noticePeriod: noticePeriod?.trim() || null,
        linkedinUrl: linkedinUrl?.trim() || null,
        resumeFilename,
        resumeData,
        resumeMimeType,
        status,
        notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      inMemoryCandidates.unshift(fallbackEntry);
      return fallbackEntry;
    }
  },

  async findAll(filters = {}) {
    const { search, category, status, location, experience } = filters;

    if (getIsConnected()) {
      let queryText = `
        SELECT id, full_name, mobile_number, email, current_location, highest_qualification,
               total_experience, current_company, current_designation, skills,
               profile_category, preferred_role, preferred_location, current_ctc,
               expected_ctc, notice_period, linkedin_url, resume_filename,
               status, notes, created_at, updated_at
        FROM candidates
        WHERE 1=1
      `;
      const values = [];

      if (category && category !== "all") {
        values.push(category);
        queryText += ` AND profile_category ILIKE $${values.length}`;
      }

      if (status && status !== "all") {
        values.push(status);
        queryText += ` AND status = $${values.length}`;
      }

      if (location && location !== "all") {
        values.push(`%${location}%`);
        queryText += ` AND (current_location ILIKE $${values.length} OR preferred_location ILIKE $${values.length})`;
      }

      if (experience && experience !== "all") {
        values.push(`%${experience}%`);
        queryText += ` AND total_experience ILIKE $${values.length}`;
      }

      if (search) {
        values.push(`%${search}%`);
        const p = values.length;
        queryText += ` AND (full_name ILIKE $${p} OR email ILIKE $${p} OR mobile_number ILIKE $${p} OR skills ILIKE $${p} OR current_company ILIKE $${p})`;
      }

      queryText += ` ORDER BY created_at DESC;`;

      const res = await pool.query(queryText, values);
      return res.rows.map(formatRow);
    }

    // In-memory filter
    return inMemoryCandidates.filter((c) => {
      if (category && category !== "all" && c.profileCategory.toLowerCase() !== category.toLowerCase()) return false;
      if (status && status !== "all" && c.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        const matches =
          c.fullName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.mobileNumber.includes(q) ||
          c.skills.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  },

  async findById(id) {
    if (getIsConnected()) {
      const res = await pool.query(`SELECT * FROM candidates WHERE id = $1`, [id]);
      if (res.rows.length === 0) return null;
      return formatRow(res.rows[0], true);
    }
    return inMemoryCandidates.find((c) => String(c.id) === String(id) || String(c._id) === String(id)) || null;
  },

  async updateStatus(id, { status, notes }) {
    if (getIsConnected()) {
      let queryText = `
        UPDATE candidates
        SET status = COALESCE($1, status),
            notes = COALESCE($2, notes),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
      `;
      const res = await pool.query(queryText, [status, notes, id]);
      if (res.rows.length === 0) return null;
      return formatRow(res.rows[0]);
    } else {
      const idx = inMemoryCandidates.findIndex((c) => String(c.id) === String(id) || String(c._id) === String(id));
      if (idx === -1) return null;
      if (status) inMemoryCandidates[idx].status = status;
      if (notes !== undefined) inMemoryCandidates[idx].notes = notes;
      inMemoryCandidates[idx].updatedAt = new Date().toISOString();
      return inMemoryCandidates[idx];
    }
  },

  async delete(id) {
    if (getIsConnected()) {
      await pool.query(`DELETE FROM candidates WHERE id = $1`, [id]);
      return true;
    }
    inMemoryCandidates = inMemoryCandidates.filter((c) => String(c.id) !== String(id) && String(c._id) !== String(id));
    return true;
  },
};

function formatRow(row, includeResumeData = false) {
  const obj = {
    _id: row.id,
    id: row.id,
    fullName: row.full_name,
    mobileNumber: row.mobile_number,
    email: row.email,
    currentLocation: row.current_location,
    highestQualification: row.highest_qualification,
    totalExperience: row.total_experience,
    currentCompany: row.current_company,
    currentDesignation: row.current_designation,
    skills: row.skills,
    profileCategory: row.profile_category,
    preferredRole: row.preferred_role,
    preferredLocation: row.preferred_location,
    currentCtc: row.current_ctc,
    expectedCtc: row.expected_ctc,
    noticePeriod: row.notice_period,
    linkedinUrl: row.linkedin_url,
    resumeFilename: row.resume_filename,
    resumeMimeType: row.resume_mime_type,
    status: row.status || "New",
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (includeResumeData && row.resume_data) {
    obj.resumeData = row.resume_data;
  }
  return obj;
}

export default Candidate;
