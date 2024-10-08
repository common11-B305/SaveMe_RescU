package com.ssafy.smru.service;

import com.ssafy.smru.dto.AppMemberDto;
import com.ssafy.smru.dto.app.AppMemberRegisterDto;
import com.ssafy.smru.exception.UnauthorizedException;
import com.ssafy.smru.security.TokenInfo;
import org.apache.coyote.BadRequestException;

import java.util.Map;

public interface AppMemberService {
    void register(AppMemberRegisterDto.Request dto);
    TokenInfo login(AppMemberDto.Request dto);
    boolean checkMemberIdDuplicate(String memberId);
    AppMemberDto.Response getMemberByPhoneNumber(String phoneNumber);
    void updatePassword(String memberId, String newPassword);
    AppMemberDto.Response getMemberByMemberId(String memberId);
    boolean checkPasswordMatchMemberId(String memberId, String currentPassword);
    boolean checkPhoneNumberDuplicate(String phone);
    AppMemberDto.Response getMemberByPhoneNumberAndMemberName(String phoneNumber, String memberName);
    AppMemberDto.Response getMemberByPhoneNumberAndMemberIdAndMemberName(String phoneNumber, String memberId, String memberName);
    void updatePhoneNumber(String currentUserName, String phone);

    TokenInfo regenerateToken(Map<String, String> req) throws BadRequestException, UnauthorizedException;
    Map<String, String> getNfcToken(String memberId);
}
