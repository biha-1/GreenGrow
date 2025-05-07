package com.dynac.plantation.model;

public class VoteRequest {

    private String userId;
    private String optionId;
    private String voteOption;
    private String voterId;

    // Getters and Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getOptionId() {
        return optionId;
    }

    public void setOptionId(String optionId) {
        this.optionId = optionId;
    }

    public String getVoterId() {
        return voterId;
    }

    public void setVoterId(String voterId) {
        this.voterId = voterId;
    }

    // Getter for voteOption
    public String getVoteOption() {
        return voteOption;
    }
}
