package com.miracle.AMAG.entity.user;

import com.miracle.AMAG.entity.account.Account;
import com.miracle.AMAG.entity.locker.Locker;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "BORROW",
        uniqueConstraints = {
                @UniqueConstraint(
                        name="BORROW_CONTRACT_HASH_UN",
                        columnNames = {"CONTRACT_HASH"}
                ),
                @UniqueConstraint(
                        name="BORROW_METADATA_URI_UN",
                        columnNames = {"METADATA_URI"}
                )
        })
@Getter
@Setter
@NoArgsConstructor
public class Borrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOCKER_ID", nullable = false)
    private Locker locker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNT_ID", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SHARE_ARTICLE_ID", nullable = false)
    private ShareArticle shareArticle;

    private LocalDateTime regDt;

    private byte useType;

    @Column(name="CONTRACT_HASH",length = 200)
    private String contractHash;

    @Column(name="METADATA_URI",length = 200)
    private String metadataUri;
}
