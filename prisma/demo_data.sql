insert into public.author (id, name, created_at, updated_at)
values ('5906e0ba-634c-41d7-9403-39dcc99d34b5', 'Cuomo', '2025-05-06 19:36:04.818', '2025-05-06 19:36:04.818');

insert into public.register (id, name, created_at, updated_at)
values ('8c1d1631-c8c9-448d-8fde-dd9975e623d6', 'Koine', '2025-05-06 20:47:59.154', '2025-05-06 20:47:59.154'),
       ('51a6c4e2-a326-4225-b90b-a5851a4260d5', 'Attic', '2025-05-06 20:48:22.951', '2025-05-06 20:48:22.951');

insert into public.speech (id, name, created_at, updated_at)
values ('a60fb3e6-8b23-46f2-8000-19fed76f9385', 'verb', '2025-05-06 21:08:01.198', '2025-05-06 21:08:01.198'),
       ('4940c245-48c9-4513-b7b3-473f6fcdbd5d', 'noun', '2025-05-06 21:12:46.873', '2025-05-06 21:12:46.873');

insert into public.lemma (id, word, link, grammatical, comparative, superlative, participle, speech_id, created_at,
                          updated_at)
values ('e8841145-8315-4dc5-83f9-933499ec15f8', 'μνημονεύω',
        'https://www.perseus.tufts.edu/hopper/morph?l=%CE%BC%CE%BD%CE%B7%CE%BC%CE%BF%CE%BD%CE%B5%CF%8D%CF%89+&la=greek#lexicon',
        false, false, false, false, 'a60fb3e6-8b23-46f2-8000-19fed76f9385', '2025-05-06 21:08:01.207',
        '2025-05-06 21:08:01.207'),
       ('1cab0237-c941-4a48-b07a-a1e183bf5097', 'μνήμη, ‑ης, ἡ',
        'https://www.perseus.tufts.edu/hopper/morph?l=%CE%BC%CE%BD%CE%AE%CE%BC%CE%B7&la=greek#lexicon', false, false,
        false, false, '4940c245-48c9-4513-b7b3-473f6fcdbd5d', '2025-05-06 21:12:46.883', '2025-05-06 21:12:46.883'),
       ('d7637169-e7ec-49eb-a866-8cedbec15d42', 'φροντίς, ἡ',
        'https://www.perseus.tufts.edu/hopper/morph?l=front%CE%AFs&la=greek#lexicon', false, false, false, false,
        '4940c245-48c9-4513-b7b3-473f6fcdbd5d', '2025-05-06 21:14:31.634', '2025-05-06 21:14:31.634');

insert into public.book (id, name, author_id, year, created_at, updated_at)
values ('73180d07-da39-4b49-8bcc-bb3c1e76c441', 'Dictionary', '5906e0ba-634c-41d7-9403-39dcc99d34b5', 2025,
        '2025-05-06 19:36:04.827', '2025-05-06 19:36:04.827');

insert into public.chapter (id, chapter_number, chapter_order, name, book_id, created_at, updated_at)
values ('2012b396-d69a-471b-98e6-36c367b0a006', '1', 0, 'Chapter 1', '73180d07-da39-4b49-8bcc-bb3c1e76c441',
        '2025-05-06 19:36:04.827', '2025-05-06 19:37:08.721');

insert into public.text (id, created_at, updated_at, chapter_id)
values ('441e9c43-90a4-4449-b1f7-cb34864398aa', '2025-05-06 19:37:08.706', '2025-05-06 19:37:08.721',
        '2012b396-d69a-471b-98e6-36c367b0a006');

insert into public.text_content (id, text_id, text_type, language, content, created_at, updated_at)
values ('cbf90100-245d-464a-8388-f1dd295ec4ae', '441e9c43-90a4-4449-b1f7-cb34864398aa', 'SOURCE', 'gr', 'Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω:-

Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-

Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἐπὶ πρώτου προσώπου∙ κατ’ ἐμαυτὸν εἴπω, διανοοῦμαι∙ ἀντὶ τοῦ ∙ ἰδικῶς μὴ παρόντος ἑτέρου· ἐπὶ βου προσώπου κατὰ σαυτὸν∙ οἷον∙ καθίσας κατὰ σαυτὸν διανοήθητι, ἀντὶ τοῦ∙ ἰδιάσας· ἐπὶ δὲ τρίτου προσώπου, καθ’ ἑαυτὸν∙ οἷον, καθ’ ἑαυτὸν διανοεῖται:-',
        '2025-05-06 19:37:08.706', '2025-05-06 19:37:08.706'),
       ('a9666b2e-28a2-49c4-9135-8fd0b0405823', '441e9c43-90a4-4449-b1f7-cb34864398aa', 'TRANSLATION', 'en', 'Invece di dire “μνημονεύω τοῦ δεῖνος [mi ricordo del tale]”, loro dicono “διὰ μνήμης ἔχω τὸν δεῖνα [ho il tale in memoria], così anche “διὰ φροντίδος ἔχω τὸν δεῖνα [ho il tale nei miei pensieri]” e “δι᾿ ἀγάπης [con amore]” e “δι’ ἀμελείας [con indifferenza]” e “δι’ ἐπαίνου [con approvazione]” e “διὰ ψόγου [con biasimo]”, invece di “φρονέω [penso]”, “ἀγαπῶ [amo]”, “ἀμελῶ [trascuro]”, “ἐπαινῶ [approvo]”, “ψέγω [biasimo]”.

Al posto di dire “ἰδικῶς [privatamente, opp. κοινῶς]”, dicono “ἰδίᾳ [peculiarly/by oneself/privately]”, come: “Parlò col tale privatamente, non essendoci nessun’altro presente”.

Instead of saying “ἰδικῶς ἐπὶ πρώτου προσώπου” [separately, with no one else being present], they say “κατ’ ἐμαυτὸν εἴπω” [I deliberated with myself], \<such as in the following case> “<κατ’ ἐμαυτὸν> διανοοῦμαι” [I think \<on my own>], instead of \<saying> “ἰδικῶς μὴ παρόντος ἑτέρου” [in particular, with no one else being present]. \<Instead of saying> “<ἰδικῶς> ἐπὶ βου προσώπου” [separately, with reference to the second person], \<they say> “κατὰ σαυτὸν” [on your own], such as in the following case: “καθίσας κατὰ σαυτὸν διανοήθητι” [take a seat and put your mind on work on your own]. which is instead of \<saying> “ἰδιάσας” [working independently]. \<Instead of saying> “<ἰδικῶς> ἐπὶ δὲ τρίτου προσώπου” [separately, with reference to the third person, \<they say> “καθ’ ἑαυτὸν” [on \<his> own], such as in the following case: “καθ’ ἑαυτὸν διανοεῖται” [he thinks on \<his> own].',
        '2025-05-06 19:37:08.706', '2025-05-06 19:37:08.706');

insert into public.example (id, name, register_id, text_content_id, created_at, updated_at)
values ('c3f28d94-d7eb-4df7-9ba3-91b2b912b407', 'μνημονεύω τοῦ δεῖνο', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 20:47:59.154', '2025-05-06 20:47:59.154'),
       ('5154fbf1-8a23-4c9a-b52d-632ef8ce854b', 'διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν',
        '51a6c4e2-a326-4225-b90b-a5851a4260d5', 'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 20:48:22.951',
        '2025-05-06 20:48:22.951'),
       ('958efe9c-a08d-41b9-ada2-67c7c63a4309', 'φροντίδος ἔχω τὸν δεῖνα', '51a6c4e2-a326-4225-b90b-a5851a4260d5',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 20:49:01.093', '2025-05-06 20:49:01.093'),
       ('b4d4f604-0301-4ac0-8ea4-4811594cdb1c', 'δι’ ἀμελείας', '51a6c4e2-a326-4225-b90b-a5851a4260d5',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 20:53:05.189', '2025-05-06 20:53:05.189'),
       ('d54a7040-ee5a-4631-907b-c572e936729e', 'δι’ ἀμελείας', '51a6c4e2-a326-4225-b90b-a5851a4260d5',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 20:54:13.565', '2025-05-06 20:54:13.565'),
       ('12489889-e32f-4ad8-8254-5bad9c51b557', 'δι’ ἐπαίνου', '51a6c4e2-a326-4225-b90b-a5851a4260d5',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:04:04.687', '2025-05-06 21:04:04.687'),
       ('6ffcc547-722a-47b9-bb1f-79e61ae6456b', 'διὰ ψόγο', '51a6c4e2-a326-4225-b90b-a5851a4260d5',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:04:19.496', '2025-05-06 21:04:19.496'),
       ('17815f8c-7a31-4440-8a5b-6535b79172bd', 'φρονέω', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:05:07.790', '2025-05-06 21:05:07.790'),
       ('a28b5026-7c98-4c6e-8b89-87034a92e40f', 'ἀγαπῶ', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:05:20.731', '2025-05-06 21:05:20.731'),
       ('461c2115-0e2c-4076-a453-0f45d8d16678', 'ἀμελῶ', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:05:35.668', '2025-05-06 21:05:35.668'),
       ('4075634b-f2df-4696-bebf-85369b3637f4', 'ἐπαινῶ', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:06:26.089', '2025-05-06 21:06:26.089'),
       ('c5534cb7-fbab-4dc2-90ff-1a190ca1dfca', 'ψέγ', '8c1d1631-c8c9-448d-8fde-dd9975e623d6',
        'cbf90100-245d-464a-8388-f1dd295ec4ae', '2025-05-06 21:06:36.377', '2025-05-06 21:06:36.377');

insert into public.annotation (id, motivation, text_id, created_at, updated_at)
values ('6f05ce8f-6cc3-4a54-8171-537affe96ef5', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.278', '2025-05-06 19:46:36.278'),
       ('882880f7-74a9-4faf-8e9f-f796a441cc9a', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.284', '2025-05-06 19:46:36.284'),
       ('38f616ca-70ee-4d48-8993-a3f3d838d321', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('29bf6b13-aa96-42ec-aad6-dc814950534f', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('cbda64bf-cc97-4824-9faa-cca470472102', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('186eb204-efa4-4196-9676-6ff4ecef12b0', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('8a5c971e-a185-4eaf-9ef4-8ec3cf3198df', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.773', '2025-05-06 19:47:16.773'),
       ('7239b9d7-ec38-4578-bb4c-c318eeb73ae7', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('d5b5e0b7-e4b5-4698-b4da-b1f150c55515', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('63284252-ed47-456f-90bc-28bae32168d5', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.802', '2025-05-06 19:47:16.802'),
       ('7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.803', '2025-05-06 19:47:16.803'),
       ('9344043e-1427-4c39-b122-15f22734caa0', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:48:47.097', '2025-05-06 19:48:47.097'),
       ('5a1e516f-072b-4350-8834-d325ba321510', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:48:52.440', '2025-05-06 19:48:52.440'),
       ('71deda20-67e0-4bc8-834d-ac4a008b6066', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:48:57.250', '2025-05-06 19:48:57.250'),
       ('e7d609cc-fdbe-4eeb-a056-3c2ad980ff11', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:49:01.718', '2025-05-06 19:49:01.718'),
       ('8624c787-3500-452c-91c4-14c750b0ec16', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:49:08.278', '2025-05-06 19:49:08.278'),
       ('e8cf384d-9120-48ce-b84f-903e035e33bf', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:49:14.423', '2025-05-06 19:49:14.423'),
       ('d3ae2da0-829b-49b3-b56c-667dfbca6725', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.769', '2025-05-06 19:49:34.496'),
       ('619a5c8c-d76f-44c6-b7d9-910f245509b7', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:47:16.777', '2025-05-06 20:46:59.127'),
       ('d5bf673d-fabc-406c-914e-a2e2e59956b5', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.280', '2025-05-06 20:47:11.631'),
       ('c5d7ee09-4673-42c8-ae81-1dc965e29202', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 20:47:59.167', '2025-05-06 20:47:59.167'),
       ('c989c8ca-d556-42b0-87ac-736eda2ca7f0', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 20:48:22.958', '2025-05-06 20:48:22.958'),
       ('2c941e47-9f87-43ad-a5f7-3baf156f4305', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 20:49:01.102', '2025-05-06 20:49:01.102'),
       ('0f6f40d7-3053-47bb-b4f0-7864b1bec260', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 19:46:36.289', '2025-05-06 20:50:32.721'),
       ('849e706d-30d0-4eff-b44a-169decf05b55', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 20:53:05.192', '2025-05-06 20:53:05.192'),
       ('a0b0b852-97c0-4185-8b5d-77ef33c5f971', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 20:54:13.576', '2025-05-06 20:54:13.576'),
       ('33c6191b-b82d-4dc1-8db4-7ffa4574db97', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:04:04.698', '2025-05-06 21:04:04.698'),
       ('ac7a50f3-901f-41f1-bae3-01737dd99f24', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:04:19.507', '2025-05-06 21:04:19.507'),
       ('4346753d-c4dc-4970-a451-f0c66d28ed8a', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:05:07.800', '2025-05-06 21:05:07.800'),
       ('b1430d8b-ca61-4437-a29b-28015e7a5880', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:05:20.739', '2025-05-06 21:05:20.739'),
       ('2f00c587-94ee-408d-ab73-dc941d084ab6', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:05:35.674', '2025-05-06 21:05:35.674'),
       ('4b574349-02a9-4a38-a926-47e81162864d', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:06:26.113', '2025-05-06 21:06:26.113'),
       ('34c0b727-5555-48a2-93ff-95fd6c828c48', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:06:36.385', '2025-05-06 21:06:36.385'),
       ('a56ad06f-53c3-4540-9819-bf033c6ebd97', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:10:53.181', '2025-05-06 21:10:53.181'),
       ('6ec5cebb-dabd-40f6-8244-80da93b7a63d', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:10:53.197', '2025-05-06 21:10:53.197'),
       ('aed78aa3-5191-4487-8363-7a1a47ce2b72', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:12:48.953', '2025-05-06 21:12:48.953'),
       ('1a1b16b8-a315-4b51-bd81-1c717f0e3058', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:12:48.960', '2025-05-06 21:12:48.960'),
       ('918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:14:37.432', '2025-05-06 21:14:37.432'),
       ('b077dd1d-9a2f-49fe-9281-dff1102f3458', 'tagging', '441e9c43-90a4-4449-b1f7-cb34864398aa',
        '2025-05-06 21:14:37.437', '2025-05-06 21:14:37.437');

insert into public.annotation_body (id, value, annotation_id, source_type, source_id, created_at, updated_at)
values ('e61e0604-bac0-42ba-8c7c-751e8549fd9c', '{
  "type": "TextualBody",
  "value": "phrase",
  "purpose": "tagging"
}', '6f05ce8f-6cc3-4a54-8171-537affe96ef5', null, null, '2025-05-06 19:46:36.278', '2025-05-06 19:46:36.278'),
       ('8f01bf42-78d6-47be-85b3-99deba1d8555', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἐπὶ πρώτου προσώπου∙ κατ’ ἐμαυτὸν εἴπω, διανοοῦμαι∙ ἀντὶ τοῦ ∙ ἰδικῶς μὴ παρόντος ἑτέρου· ἐπὶ βου προσώπου κατὰ σαυτὸν∙ οἷον∙ καθίσας κατὰ σαυτὸν διανοήθητι, ἀντὶ τοῦ∙ ἰδιάσας· ἐπὶ δὲ τρίτου προσώπου, καθ’ ἑαυτὸν∙ οἷον, καθ’ ἑαυτὸν διανοεῖται:-",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '6f05ce8f-6cc3-4a54-8171-537affe96ef5', null, null, '2025-05-06 19:46:36.278', '2025-05-06 19:46:36.278'),
       ('613b087c-5a62-40d6-8d38-31fffea0fa39', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', '882880f7-74a9-4faf-8e9f-f796a441cc9a', null, null, '2025-05-06 19:46:36.284', '2025-05-06 19:46:36.284'),
       ('747f8b23-76dd-4494-b96f-7864478b4a48', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '882880f7-74a9-4faf-8e9f-f796a441cc9a', null, null, '2025-05-06 19:46:36.284', '2025-05-06 19:46:36.284'),
       ('3a5bbeb8-83eb-4c3c-9551-ab5c1563feaf', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '38f616ca-70ee-4d48-8993-a3f3d838d321', null, null, '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('e5b60f41-a129-46bd-a68d-e546fe8921d3', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς, ἰδίᾳ λέγουσιν∙ οἷον ἰδίᾳ ὡμίλησα τῷ δεῖνι∙ μηδενὸς ἑτέρου παρόντος:-",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '38f616ca-70ee-4d48-8993-a3f3d838d321', null, null, '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('52c50917-5a89-4961-b751-955553e0c06e', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', '29bf6b13-aa96-42ec-aad6-dc814950534f', null, null, '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('1282c8b9-b0f8-4413-a386-303b0743af9b', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ ἰδικῶς ἐπὶ πρώτου προσώπου∙ κατ’ ἐμαυτὸν εἴπω, διανοοῦμαι∙ ἀντὶ τοῦ ∙ ἰδικῶς μὴ παρόντος ἑτέρου· ἐπὶ βου προσώπου κατὰ σαυτὸν∙ οἷον∙ καθίσας κατὰ σαυτὸν διανοήθητι, ἀντὶ τοῦ∙ ἰδιάσας· ἐπὶ δὲ τρίτου προσώπου, καθ’ ἑαυτὸν∙ οἷον, καθ’ ἑαυτὸν διανοεῖται:-",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '29bf6b13-aa96-42ec-aad6-dc814950534f', null, null, '2025-05-06 19:46:36.285', '2025-05-06 19:46:36.285'),
       ('3a8be043-5851-4b07-a4a7-589bc60f639f', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', 'cbda64bf-cc97-4824-9faa-cca470472102', null, null, '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('87793c2a-0f6b-4e06-8f3e-c3b636dd4d52', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', 'd5b5e0b7-e4b5-4698-b4da-b1f150c55515', null, null, '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('8f2917c3-5d87-4892-8c64-6b4b0c793ba3', '{
         "type": "TextualBody",
         "value": " \\<Instead of saying> “<ἰδικῶς> ἐπὶ βου προσώπου” [separately, with reference to the second person], \\<they say> “κατὰ σαυτὸν” [on your own], such as in the following case: “καθίσας κατὰ σαυτὸν διανοήθητι” [take a seat and put your mind on work on your own]",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', 'd5b5e0b7-e4b5-4698-b4da-b1f150c55515', null, null, '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('6d415646-6e7b-4945-8ab5-9eace123df5a', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', 'd3ae2da0-829b-49b3-b56c-667dfbca6725', null, null, '2025-05-06 19:49:34.496', '2025-05-06 19:49:34.496'),
       ('aff02894-6b83-4a1c-820f-ed1be1615d6a', '{
         "type": "TextualBody",
         "value": "Al posto di dire “ἰδικῶς [privatamente, opp. κοινῶς]”, dicono “ἰδίᾳ [peculiarly/by oneself/privately]”, come: “Parlò col tale privatamente, non essendoci nessun’altro presente”.",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', 'd3ae2da0-829b-49b3-b56c-667dfbca6725', null, null, '2025-05-06 19:49:34.496', '2025-05-06 19:49:34.496'),
       ('3b3336c6-3910-43e4-92c9-3bdb5289501a', '{
         "type": "TextualBody",
         "value": "Invece di dire “μνημονεύω τοῦ δεῖνος [mi ricordo del tale]”, loro dicono “διὰ μνήμης ἔχω τὸν δεῖνα [ho il tale in memoria], così anche “διὰ φροντίδος ἔχω τὸν δεῖνα [ho il tale nei miei pensieri]” e “δι᾿ ἀγάπης [con amore]” e “δι’ ἀμελείας [con indifferenza]” e “δι’ ἐπαίνου [con approvazione]” e “διὰ ψόγου [con biasimo]”, invece di “φρονέω [penso]”, “ἀγαπῶ [amo]”, “ἀμελῶ [trascuro]”, “ἐπαινῶ [approvo]”, “ψέγω [biasimo]”.",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', 'cbda64bf-cc97-4824-9faa-cca470472102', null, null, '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('b0edcfcb-220c-47fd-ac08-878828606a5b', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '7239b9d7-ec38-4578-bb4c-c318eeb73ae7', null, null, '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('2eec6ce8-a45c-4566-9574-0b689f0e2265', '{
         "type": "TextualBody",
         "value": "Instead of saying “ἰδικῶς ἐπὶ πρώτου προσώπου” [separately, with no one else being present], they say “κατ’ ἐμαυτὸν εἴπω” [I deliberated with myself], \\<such as in the following case> “<κατ’ ἐμαυτὸν> διανοοῦμαι” [I think \\<on my own>], instead of \\<saying> “ἰδικῶς μὴ παρόντος ἑτέρου” [in particular, with no one else being present]",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '7239b9d7-ec38-4578-bb4c-c318eeb73ae7', null, null, '2025-05-06 19:47:16.798', '2025-05-06 19:47:16.798'),
       ('2169d956-acd9-44fe-9ac9-78d824304a20', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32', null, null, '2025-05-06 19:47:16.803', '2025-05-06 19:47:16.803'),
       ('c9eba5fd-576e-4e5a-ab77-0938e17e781f', '{
         "type": "TextualBody",
         "value": " \\<Instead of saying> “<ἰδικῶς> ἐπὶ δὲ τρίτου προσώπου” [separately, with reference to the third person, \\<they say> “καθ’ ἑαυτὸν” [on \\<his> own], such as in the following case: “καθ’ ἑαυτὸν διανοεῖται” [he thinks on \\<his> own]",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32', null, null, '2025-05-06 19:47:16.803', '2025-05-06 19:47:16.803'),
       ('77ca1cdb-2de0-422b-a2f4-1d60678ab6b0', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '8a5c971e-a185-4eaf-9ef4-8ec3cf3198df', null, null, '2025-05-06 19:47:16.773', '2025-05-06 19:47:16.773'),
       ('749f7c95-5e69-4a0c-9e70-d219b6e6a7ee', '{
         "type": "TextualBody",
         "value": "Invece di dire “μνημονεύω τοῦ δεῖνος [mi ricordo del tale]”, loro dicono “διὰ μνήμης ἔχω τὸν δεῖνα [ho il tale in memoria], così anche “διὰ φροντίδος ἔχω τὸν δεῖνα [ho il tale nei miei pensieri]” e “δι᾿ ἀγάπης [con amore]” e “δι’ ἀμελείας [con indifferenza]” e “δι’ ἐπαίνου [con approvazione]” e “διὰ ψόγου [con biasimo]”, invece di “φρονέω [penso]”, “ἀγαπῶ [amo]”, “ἀμελῶ [trascuro]”, “ἐπαινῶ [approvo]”, “ψέγω [biasimo]”",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '8a5c971e-a185-4eaf-9ef4-8ec3cf3198df', null, null, '2025-05-06 19:47:16.773', '2025-05-06 19:47:16.773'),
       ('0759f598-4f54-4b30-8fc3-46a3121d50d7', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', '186eb204-efa4-4196-9676-6ff4ecef12b0', null, null, '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('e552675a-2b6c-42be-9d29-458f77f9a570', '{
         "type": "TextualBody",
         "value": "Instead of saying “ἰδικῶς ἐπὶ πρώτου προσώπου” [separately, with no one else being present], they say “κατ’ ἐμαυτὸν εἴπω” [I deliberated with myself], \\<such as in the following case> “<κατ’ ἐμαυτὸν> διανοοῦμαι” [I think \\<on my own>], instead of \\<saying> “ἰδικῶς μὴ παρόντος ἑτέρου” [in particular, with no one else being present]. \\<Instead of saying> “<ἰδικῶς> ἐπὶ βου προσώπου” [separately, with reference to the second person], \\<they say> “κατὰ σαυτὸν” [on your own], such as in the following case: “καθίσας κατὰ σαυτὸν διανοήθητι” [take a seat and put your mind on work on your own]. which is instead of \\<saying> “ἰδιάσας” [working independently]. \\<Instead of saying> “<ἰδικῶς> ἐπὶ δὲ τρίτου προσώπου” [separately, with reference to the third person, \\<they say> “καθ’ ἑαυτὸν” [on \\<his> own], such as in the following case: “καθ’ ἑαυτὸν διανοεῖται” [he thinks on \\<his> own].",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '186eb204-efa4-4196-9676-6ff4ecef12b0', null, null, '2025-05-06 19:47:16.770', '2025-05-06 19:47:16.770'),
       ('9dcf7b4c-f236-4343-bad3-1c87dc618696', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '63284252-ed47-456f-90bc-28bae32168d5', null, null, '2025-05-06 19:47:16.802', '2025-05-06 19:47:16.802'),
       ('69813888-00e6-4820-9eb1-d0ca290fb81b', '{
         "type": "TextualBody",
         "value": " which is instead of \\<saying> “ἰδιάσας” [working independently]",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '63284252-ed47-456f-90bc-28bae32168d5', null, null, '2025-05-06 19:47:16.802', '2025-05-06 19:47:16.802'),
       ('11b4c088-c3fd-4b2a-a194-315d7261263f', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', '9344043e-1427-4c39-b122-15f22734caa0', null, null, '2025-05-06 19:48:47.097', '2025-05-06 19:48:47.097'),
       ('84d43688-3cab-48d7-8a22-063df0edb658', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', '5a1e516f-072b-4350-8834-d325ba321510', null, null, '2025-05-06 19:48:52.440', '2025-05-06 19:48:52.440'),
       ('49b43722-ef1d-4e0f-ae12-8e07bded95c7', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', '71deda20-67e0-4bc8-834d-ac4a008b6066', null, null, '2025-05-06 19:48:57.250', '2025-05-06 19:48:57.250'),
       ('36c35a66-41a4-434e-b57c-8336c0ed4116', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', 'e7d609cc-fdbe-4eeb-a056-3c2ad980ff11', null, null, '2025-05-06 19:49:01.718', '2025-05-06 19:49:01.718'),
       ('0ebac178-8d60-4c7b-99d7-155eca4f6d59', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', '8624c787-3500-452c-91c4-14c750b0ec16', null, null, '2025-05-06 19:49:08.278', '2025-05-06 19:49:08.278'),
       ('50246151-d3a6-4be5-b24f-da2a1ecdc522', '{
         "type": "TextualBody",
         "value": "translation",
         "purpose": "tagging"
       }', 'e8cf384d-9120-48ce-b84f-903e035e33bf', null, null, '2025-05-06 19:49:14.423', '2025-05-06 19:49:14.423'),
       ('6d432816-c289-4308-954d-782f20d8dead', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '619a5c8c-d76f-44c6-b7d9-910f245509b7', null, null, '2025-05-06 20:46:59.127', '2025-05-06 20:46:59.127'),
       ('ee8d8d11-5832-403b-92c3-d6883c7c6cf9', '{
         "type": "TextualBody",
         "value": "Al posto di dire “ἰδικῶς [privatamente, opp. κοινῶς]”, dicono “ἰδίᾳ [peculiarly/by oneself/privately]”, come: “Parlò col tale privatamente, non essendoci nessun’altro presente”",
         "format": "text",
         "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823",
         "language": "en"
       }', '619a5c8c-d76f-44c6-b7d9-910f245509b7', null, null, '2025-05-06 20:46:59.127', '2025-05-06 20:46:59.127'),
       ('e26f1b5d-8495-4141-8459-8995c3b517c2', '{
         "type": "TextualBody",
         "value": "paragraph",
         "purpose": "tagging"
       }', 'd5bf673d-fabc-406c-914e-a2e2e59956b5', null, null, '2025-05-06 20:47:11.631', '2025-05-06 20:47:11.631'),
       ('75f6dd61-d794-4db1-821e-4c4ca2ab9d94', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω:",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'd5bf673d-fabc-406c-914e-a2e2e59956b5', null, null, '2025-05-06 20:47:11.631', '2025-05-06 20:47:11.631'),
       ('6e28048f-1ff2-44ca-b07a-28e78201c2e6', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', 'c5d7ee09-4673-42c8-ae81-1dc965e29202', null, null, '2025-05-06 20:47:59.167', '2025-05-06 20:47:59.167'),
       ('a42c83b0-a242-4af1-a63e-9fcd00f51ca4', '{
         "type": "TextualBody",
         "value": "μνημονεύω τοῦ δεῖνο",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'c5d7ee09-4673-42c8-ae81-1dc965e29202', null, null, '2025-05-06 20:47:59.167', '2025-05-06 20:47:59.167'),
       ('5121d916-10b8-418c-b8fe-0ec3d99371a7', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:c3f28d94-d7eb-4df7-9ba3-91b2b912b407",
         "purpose": "describing"
       }', 'c5d7ee09-4673-42c8-ae81-1dc965e29202', 'example', 'c3f28d94-d7eb-4df7-9ba3-91b2b912b407',
        '2025-05-06 20:47:59.167', '2025-05-06 20:47:59.167'),
       ('55f2f2f7-aee4-4351-b3ad-c8e483da553b', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', 'c989c8ca-d556-42b0-87ac-736eda2ca7f0', null, null, '2025-05-06 20:48:22.958', '2025-05-06 20:48:22.958'),
       ('4deb9439-12b7-42df-8a91-7f5333b18b8b', '{
         "type": "TextualBody",
         "value": "διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'c989c8ca-d556-42b0-87ac-736eda2ca7f0', null, null, '2025-05-06 20:48:22.958', '2025-05-06 20:48:22.958'),
       ('28ccf6db-9a87-4390-b8d8-0539b8058e8c', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:5154fbf1-8a23-4c9a-b52d-632ef8ce854b",
         "purpose": "describing"
       }', 'c989c8ca-d556-42b0-87ac-736eda2ca7f0', 'example', '5154fbf1-8a23-4c9a-b52d-632ef8ce854b',
        '2025-05-06 20:48:22.958', '2025-05-06 20:48:22.958'),
       ('ef6b8f67-b470-47c4-8887-f496bf33b8ef', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '2c941e47-9f87-43ad-a5f7-3baf156f4305', null, null, '2025-05-06 20:49:01.102', '2025-05-06 20:49:01.102'),
       ('abc5bacb-c15d-4247-8352-d5d6460d0c57', '{
         "type": "TextualBody",
         "value": "φροντίδος ἔχω τὸν δεῖνα",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '2c941e47-9f87-43ad-a5f7-3baf156f4305', null, null, '2025-05-06 20:49:01.102', '2025-05-06 20:49:01.102'),
       ('48e17a9c-70c3-4ee9-aafe-be950988a364', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:958efe9c-a08d-41b9-ada2-67c7c63a4309",
         "purpose": "describing"
       }', '2c941e47-9f87-43ad-a5f7-3baf156f4305', 'example', '958efe9c-a08d-41b9-ada2-67c7c63a4309',
        '2025-05-06 20:49:01.102', '2025-05-06 20:49:01.102'),
       ('67b0c5a1-31db-4588-b223-785484bf068f', '{
         "type": "TextualBody",
         "value": "phrase",
         "purpose": "tagging"
       }', '0f6f40d7-3053-47bb-b4f0-7864b1bec260', null, null, '2025-05-06 20:50:32.721', '2025-05-06 20:50:32.721'),
       ('fe65a7fb-965f-4933-a480-0b0de0d7e189', '{
         "type": "TextualBody",
         "value": "Ἀντὶ τοῦ εἰπεῖν∙ μνημονεύω τοῦ δεῖνος, διὰ μνήμης ἔχω τὸν δεῖνα λέγουσιν∙ οὕτω καὶ διὰ φροντίδος ἔχω τὸν δεῖνα∙ καὶ δι᾿ ἀγάπης∙ καὶ δι’ ἀμελείας∙ καὶ δι’ ἐπαίνου∙ καὶ διὰ ψόγου, ἀντὶ τοῦ φρονέω∙ καὶ ἀγαπῶ∙ καὶ ἀμελῶ∙ καὶ ἐπαινῶ∙ καὶ ψέγω",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '0f6f40d7-3053-47bb-b4f0-7864b1bec260', null, null, '2025-05-06 20:50:32.721', '2025-05-06 20:50:32.721'),
       ('4ba5d345-2d2a-442b-b90f-d543f24034d1', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '849e706d-30d0-4eff-b44a-169decf05b55', null, null, '2025-05-06 20:53:05.192', '2025-05-06 20:53:05.192'),
       ('aa68f15e-6151-48d3-b462-9575aaf845cb', '{
         "type": "TextualBody",
         "value": "δι’ ἀμελείας",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '849e706d-30d0-4eff-b44a-169decf05b55', null, null, '2025-05-06 20:53:05.192', '2025-05-06 20:53:05.192'),
       ('31cd17c6-73d8-41eb-bdc5-98afd305f886', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:b4d4f604-0301-4ac0-8ea4-4811594cdb1c",
         "purpose": "describing"
       }', '849e706d-30d0-4eff-b44a-169decf05b55', 'example', 'b4d4f604-0301-4ac0-8ea4-4811594cdb1c',
        '2025-05-06 20:53:05.192', '2025-05-06 20:53:05.192'),
       ('08cbbde7-cde7-47a3-8007-fede3e9e4402', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', 'a0b0b852-97c0-4185-8b5d-77ef33c5f971', null, null, '2025-05-06 20:54:13.576', '2025-05-06 20:54:13.576'),
       ('a591de8b-4598-4b1e-bc3c-77ca7c5843cd', '{
         "type": "TextualBody",
         "value": "δι’ ἀμελείας",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'a0b0b852-97c0-4185-8b5d-77ef33c5f971', null, null, '2025-05-06 20:54:13.576', '2025-05-06 20:54:13.576'),
       ('93fed740-1509-477f-9a9d-2b3597f7c7ab', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:d54a7040-ee5a-4631-907b-c572e936729e",
         "purpose": "describing"
       }', 'a0b0b852-97c0-4185-8b5d-77ef33c5f971', 'example', 'd54a7040-ee5a-4631-907b-c572e936729e',
        '2025-05-06 20:54:13.576', '2025-05-06 20:54:13.576'),
       ('cdad8ec2-5a1a-4c9c-9b3d-8306f40d13d8', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '33c6191b-b82d-4dc1-8db4-7ffa4574db97', null, null, '2025-05-06 21:04:04.698', '2025-05-06 21:04:04.698'),
       ('eccbe74b-c4db-4187-903d-795ecc69b72c', '{
         "type": "TextualBody",
         "value": "δι’ ἐπαίνου",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '33c6191b-b82d-4dc1-8db4-7ffa4574db97', null, null, '2025-05-06 21:04:04.698', '2025-05-06 21:04:04.698'),
       ('682ce5a9-97de-4bd1-99b5-cecce5f51295', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:12489889-e32f-4ad8-8254-5bad9c51b557",
         "purpose": "describing"
       }', '33c6191b-b82d-4dc1-8db4-7ffa4574db97', 'example', '12489889-e32f-4ad8-8254-5bad9c51b557',
        '2025-05-06 21:04:04.698', '2025-05-06 21:04:04.698'),
       ('b1860837-73d5-415d-bd6c-ecfb249e9738', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', 'ac7a50f3-901f-41f1-bae3-01737dd99f24', null, null, '2025-05-06 21:04:19.507', '2025-05-06 21:04:19.507'),
       ('70f9bd6c-11a0-4bd0-a9df-ec05ba15a04d', '{
         "type": "TextualBody",
         "value": "διὰ ψόγο",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'ac7a50f3-901f-41f1-bae3-01737dd99f24', null, null, '2025-05-06 21:04:19.507', '2025-05-06 21:04:19.507'),
       ('d87921e1-525e-4468-bd59-490003705fbb', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "51a6c4e2-a326-4225-b90b-a5851a4260d5",
             "name": "Attic"
           }
         },
         "source": "mela:example:6ffcc547-722a-47b9-bb1f-79e61ae6456b",
         "purpose": "describing"
       }', 'ac7a50f3-901f-41f1-bae3-01737dd99f24', 'example', '6ffcc547-722a-47b9-bb1f-79e61ae6456b',
        '2025-05-06 21:04:19.507', '2025-05-06 21:04:19.507'),
       ('c94ed3a0-991b-4121-be00-f3baa9d1f334', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '4346753d-c4dc-4970-a451-f0c66d28ed8a', null, null, '2025-05-06 21:05:07.800', '2025-05-06 21:05:07.800'),
       ('5cd01da3-4813-4b8c-9b55-32e7601c0390', '{
         "type": "TextualBody",
         "value": "φρονέω",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '4346753d-c4dc-4970-a451-f0c66d28ed8a', null, null, '2025-05-06 21:05:07.800', '2025-05-06 21:05:07.800'),
       ('a8d27f68-5d23-44fb-bfc9-556d2d288db8', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:17815f8c-7a31-4440-8a5b-6535b79172bd",
         "purpose": "describing"
       }', '4346753d-c4dc-4970-a451-f0c66d28ed8a', 'example', '17815f8c-7a31-4440-8a5b-6535b79172bd',
        '2025-05-06 21:05:07.800', '2025-05-06 21:05:07.800'),
       ('66640c01-3ffa-4767-a73e-677bfac0e6a1', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', 'b1430d8b-ca61-4437-a29b-28015e7a5880', null, null, '2025-05-06 21:05:20.739', '2025-05-06 21:05:20.739'),
       ('8fad89d3-42c1-481b-8547-ca98d33607d1', '{
         "type": "TextualBody",
         "value": "ἀγαπῶ",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'b1430d8b-ca61-4437-a29b-28015e7a5880', null, null, '2025-05-06 21:05:20.739', '2025-05-06 21:05:20.739'),
       ('3bceb54e-e320-472d-84bf-b2f7fc7ceba2', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:a28b5026-7c98-4c6e-8b89-87034a92e40f",
         "purpose": "describing"
       }', 'b1430d8b-ca61-4437-a29b-28015e7a5880', 'example', 'a28b5026-7c98-4c6e-8b89-87034a92e40f',
        '2025-05-06 21:05:20.739', '2025-05-06 21:05:20.739'),
       ('221d8779-2ed1-4b3a-9fe5-f9063f121d9d', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '2f00c587-94ee-408d-ab73-dc941d084ab6', null, null, '2025-05-06 21:05:35.674', '2025-05-06 21:05:35.674'),
       ('594915a5-276b-4216-b625-55029656bf5e', '{
         "type": "TextualBody",
         "value": "ἀμελῶ",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '2f00c587-94ee-408d-ab73-dc941d084ab6', null, null, '2025-05-06 21:05:35.674', '2025-05-06 21:05:35.674'),
       ('061c4d53-f6f5-4f20-883d-55eea5cdf3f5', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:461c2115-0e2c-4076-a453-0f45d8d16678",
         "purpose": "describing"
       }', '2f00c587-94ee-408d-ab73-dc941d084ab6', 'example', '461c2115-0e2c-4076-a453-0f45d8d16678',
        '2025-05-06 21:05:35.674', '2025-05-06 21:05:35.674'),
       ('a757318e-aad9-4bef-81d9-8d97ade9edb8', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '4b574349-02a9-4a38-a926-47e81162864d', null, null, '2025-05-06 21:06:26.113', '2025-05-06 21:06:26.113'),
       ('4c857561-e426-49fb-8e94-168e078111d1', '{
         "type": "TextualBody",
         "value": "example",
         "purpose": "tagging"
       }', '34c0b727-5555-48a2-93ff-95fd6c828c48', null, null, '2025-05-06 21:06:36.385', '2025-05-06 21:06:36.385'),
       ('68ea3e62-ffdc-4b34-a330-59bc41afcc00', '{
         "type": "TextualBody",
         "value": "ἐπαινῶ",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '4b574349-02a9-4a38-a926-47e81162864d', null, null, '2025-05-06 21:06:26.113', '2025-05-06 21:06:26.113'),
       ('7f307ac1-7694-4abd-9066-129b42397f42', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:4075634b-f2df-4696-bebf-85369b3637f4",
         "purpose": "describing"
       }', '4b574349-02a9-4a38-a926-47e81162864d', 'example', '4075634b-f2df-4696-bebf-85369b3637f4',
        '2025-05-06 21:06:26.113', '2025-05-06 21:06:26.113'),
       ('7edacb29-9b00-4f80-b7e2-00dbba803194', '{
         "type": "TextualBody",
         "value": "ψέγ",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '34c0b727-5555-48a2-93ff-95fd6c828c48', null, null, '2025-05-06 21:06:36.385', '2025-05-06 21:06:36.385'),
       ('3287f08a-a791-425b-b68b-93ac4a02f60c', '{
         "type": "SpecificResource",
         "value": {
           "register": {
             "id": "8c1d1631-c8c9-448d-8fde-dd9975e623d6",
             "name": "Koine"
           }
         },
         "source": "mela:example:c5534cb7-fbab-4dc2-90ff-1a190ca1dfca",
         "purpose": "describing"
       }', '34c0b727-5555-48a2-93ff-95fd6c828c48', 'example', 'c5534cb7-fbab-4dc2-90ff-1a190ca1dfca',
        '2025-05-06 21:06:36.385', '2025-05-06 21:06:36.385'),
       ('367f23cd-a70e-4d5b-8f6b-22da12f65f73', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', 'a56ad06f-53c3-4540-9819-bf033c6ebd97', null, null, '2025-05-06 21:10:53.181', '2025-05-06 21:10:53.181'),
       ('9c351242-a417-4f9c-897f-c2494ea6e1e3', '{
         "type": "TextualBody",
         "value": "μνημονεύ",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'a56ad06f-53c3-4540-9819-bf033c6ebd97', null, null, '2025-05-06 21:10:53.181', '2025-05-06 21:10:53.181'),
       ('6edc9846-546a-4204-9dc7-65a5e3ab8a19', '{
         "type": "SpecificResource",
         "value": {
           "id": "e8841145-8315-4dc5-83f9-933499ec15f8",
           "word": "μνημονεύω"
         },
         "source": "mela:lemma:e8841145-8315-4dc5-83f9-933499ec15f8",
         "purpose": "describing"
       }', 'a56ad06f-53c3-4540-9819-bf033c6ebd97', 'lemma', 'e8841145-8315-4dc5-83f9-933499ec15f8',
        '2025-05-06 21:10:53.181', '2025-05-06 21:10:53.181'),
       ('b48e91be-83e3-42b3-8e5d-844836e641a0', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', '6ec5cebb-dabd-40f6-8244-80da93b7a63d', null, null, '2025-05-06 21:10:53.197', '2025-05-06 21:10:53.197'),
       ('0f403afa-c0c2-4ae9-9864-00affea616c8', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', 'aed78aa3-5191-4487-8363-7a1a47ce2b72', null, null, '2025-05-06 21:12:48.953', '2025-05-06 21:12:48.953'),
       ('59d304d3-6d71-4e32-ad35-19a8c8e1ce52', '{
         "type": "TextualBody",
         "value": "μνήμη",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', 'aed78aa3-5191-4487-8363-7a1a47ce2b72', null, null, '2025-05-06 21:12:48.953', '2025-05-06 21:12:48.953'),
       ('e9281528-a643-4f70-be6b-d0f39b5d0751', '{
         "type": "SpecificResource",
         "value": {
           "id": "1cab0237-c941-4a48-b07a-a1e183bf5097",
           "word": "μνήμη, ‑ης, ἡ"
         },
         "source": "mela:lemma:1cab0237-c941-4a48-b07a-a1e183bf5097",
         "purpose": "describing"
       }', 'aed78aa3-5191-4487-8363-7a1a47ce2b72', 'lemma', '1cab0237-c941-4a48-b07a-a1e183bf5097',
        '2025-05-06 21:12:48.953', '2025-05-06 21:12:48.953'),
       ('3efd49a1-0bbb-48ba-b84b-6d828ce3862a', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', '1a1b16b8-a315-4b51-bd81-1c717f0e3058', null, null, '2025-05-06 21:12:48.960', '2025-05-06 21:12:48.960'),
       ('79239db7-e339-4e9a-8a84-d1dc07bac8e8', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', null, null, '2025-05-06 21:14:37.432', '2025-05-06 21:14:37.432'),
       ('2190fc48-33bc-45b6-8da4-a417597de2e4', '{
         "type": "TextualBody",
         "value": "φροντίδο",
         "format": "text",
         "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae",
         "language": "gr"
       }', '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', null, null, '2025-05-06 21:14:37.432', '2025-05-06 21:14:37.432'),
       ('689c052b-5605-4cfa-be06-db3fd4107afb', '{
         "type": "SpecificResource",
         "value": {
           "id": "d7637169-e7ec-49eb-a866-8cedbec15d42",
           "word": "φροντίς, ἡ"
         },
         "source": "mela:lemma:d7637169-e7ec-49eb-a866-8cedbec15d42",
         "purpose": "describing"
       }', '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', 'lemma', 'd7637169-e7ec-49eb-a866-8cedbec15d42',
        '2025-05-06 21:14:37.432', '2025-05-06 21:14:37.432'),
       ('9fcc8750-c33b-4fbf-baf8-21933e6b7d0c', '{
         "type": "TextualBody",
         "value": "lemma",
         "purpose": "tagging"
       }', 'b077dd1d-9a2f-49fe-9281-dff1102f3458', null, null, '2025-05-06 21:14:37.437', '2025-05-06 21:14:37.437');

INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('db04615d-2bf8-4cb4-8c20-123b82796571',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '6f05ce8f-6cc3-4a54-8171-537affe96ef5', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('3e1f0d00-3b57-4faa-a1e0-1a5de71c3fd6',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 604, "type": "TextPositionSelector", "start": 336}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '6f05ce8f-6cc3-4a54-8171-537affe96ef5', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('e55eed07-b517-44b2-9f44-ec140f7b978d',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '882880f7-74a9-4faf-8e9f-f796a441cc9a', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('700f7e38-d12a-41bb-90f4-17b821074484',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 334, "type": "TextPositionSelector", "start": 241}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '882880f7-74a9-4faf-8e9f-f796a441cc9a', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('382740ca-69a9-467a-a8e1-ecb241d75f99',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '29bf6b13-aa96-42ec-aad6-dc814950534f', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('da9a35e6-9bb2-46d3-98c9-6750126c1b92',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 604, "type": "TextPositionSelector", "start": 336}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '29bf6b13-aa96-42ec-aad6-dc814950534f', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('8c6d9221-76fa-44e0-915f-c1417ce80287',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '38f616ca-70ee-4d48-8993-a3f3d838d321', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('9ab9b645-c268-4c0d-8804-d59bb090b19c',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 334, "type": "TextPositionSelector", "start": 241}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '38f616ca-70ee-4d48-8993-a3f3d838d321', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('a3b945b2-2d5e-4de4-8733-ae037358a1b6',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        'cbda64bf-cc97-4824-9faa-cca470472102', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('0d9fa5c9-ac59-4de3-90d0-4a7f1b1a671c',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 423, "type": "TextPositionSelector", "start": 0}, "textDirection": "ltr", "processingLanguage": "en"}',
        'cbda64bf-cc97-4824-9faa-cca470472102', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('a3f7f4b1-0d74-4415-ac61-d44bcaddc1e9',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '8a5c971e-a185-4eaf-9ef4-8ec3cf3198df', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('633bda07-6654-48f0-88c2-f6c5faa7640d',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 422, "type": "TextPositionSelector", "start": 0}, "textDirection": "ltr", "processingLanguage": "en"}',
        '8a5c971e-a185-4eaf-9ef4-8ec3cf3198df', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('df2c683f-1764-468f-8741-3b494d014388',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '186eb204-efa4-4196-9676-6ff4ecef12b0', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('526a3be0-9882-4437-82ab-5c664b64e9fb',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '7239b9d7-ec38-4578-bb4c-c318eeb73ae7', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('4d8c2d5c-a0bd-400e-9c87-f5204096395f',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 1490, "type": "TextPositionSelector", "start": 604}, "textDirection": "ltr", "processingLanguage": "en"}',
        '186eb204-efa4-4196-9676-6ff4ecef12b0', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('28cc1feb-b523-4c8e-bdcf-fdaa66e621ff',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '63284252-ed47-456f-90bc-28bae32168d5', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('0bd21ab0-af1b-46e7-9717-a7fc4473cb40',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 1259, "type": "TextPositionSelector", "start": 1195}, "textDirection": "ltr", "processingLanguage": "en"}',
        '63284252-ed47-456f-90bc-28bae32168d5', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('7509214b-75ea-4727-a017-2cbe8db3d7f2',
        '{"type": "Text", "source": "mela:annotation:6f05ce8f-6cc3-4a54-8171-537affe96ef5"}',
        '9344043e-1427-4c39-b122-15f22734caa0', 'annotation', '6f05ce8f-6cc3-4a54-8171-537affe96ef5',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('359fcb40-9cdf-4290-922c-4cecc91ad969',
        '{"type": "Text", "source": "mela:annotation:7239b9d7-ec38-4578-bb4c-c318eeb73ae7"}',
        '9344043e-1427-4c39-b122-15f22734caa0', 'annotation', '7239b9d7-ec38-4578-bb4c-c318eeb73ae7',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('1f703332-a353-4d2c-a491-62fdf782cea3',
        '{"type": "Text", "source": "mela:annotation:6f05ce8f-6cc3-4a54-8171-537affe96ef5"}',
        '5a1e516f-072b-4350-8834-d325ba321510', 'annotation', '6f05ce8f-6cc3-4a54-8171-537affe96ef5',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('eee14944-a1a0-4335-a20e-d196b9a7f621',
        '{"type": "Text", "source": "mela:annotation:d5b5e0b7-e4b5-4698-b4da-b1f150c55515"}',
        '5a1e516f-072b-4350-8834-d325ba321510', 'annotation', 'd5b5e0b7-e4b5-4698-b4da-b1f150c55515',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('ebf64373-0d71-45c9-84ff-69a74532c0b9',
        '{"type": "Text", "source": "mela:annotation:6f05ce8f-6cc3-4a54-8171-537affe96ef5"}',
        '71deda20-67e0-4bc8-834d-ac4a008b6066', 'annotation', '6f05ce8f-6cc3-4a54-8171-537affe96ef5',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('d7510546-2469-4c10-9110-f9de7747b38e',
        '{"type": "Text", "source": "mela:annotation:63284252-ed47-456f-90bc-28bae32168d5"}',
        '71deda20-67e0-4bc8-834d-ac4a008b6066', 'annotation', '63284252-ed47-456f-90bc-28bae32168d5',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('f2b7e5e7-d58e-4c48-8197-b1494d510426',
        '{"type": "Text", "source": "mela:annotation:6f05ce8f-6cc3-4a54-8171-537affe96ef5"}',
        'e7d609cc-fdbe-4eeb-a056-3c2ad980ff11', 'annotation', '6f05ce8f-6cc3-4a54-8171-537affe96ef5',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('96703ad2-2c58-4c3c-9625-90466fde15ff',
        '{"type": "Text", "source": "mela:annotation:7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32"}',
        'e7d609cc-fdbe-4eeb-a056-3c2ad980ff11', 'annotation', '7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('3a92100b-b2af-4bbb-98a5-e989cf8cd3f5',
        '{"type": "Text", "source": "mela:annotation:38f616ca-70ee-4d48-8993-a3f3d838d321"}',
        '8624c787-3500-452c-91c4-14c750b0ec16', 'annotation', '38f616ca-70ee-4d48-8993-a3f3d838d321',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('bf6b1b12-d349-4389-99b9-3a4c0bd307e7',
        '{"type": "Text", "source": "mela:annotation:619a5c8c-d76f-44c6-b7d9-910f245509b7"}',
        '8624c787-3500-452c-91c4-14c750b0ec16', 'annotation', '619a5c8c-d76f-44c6-b7d9-910f245509b7',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('eeb94cf3-24cd-4bec-b6ff-875f9ba77c52',
        '{"type": "Text", "source": "mela:annotation:0f6f40d7-3053-47bb-b4f0-7864b1bec260"}',
        'e8cf384d-9120-48ce-b84f-903e035e33bf', 'annotation', '0f6f40d7-3053-47bb-b4f0-7864b1bec260',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('a79def95-c586-4b2e-8652-d352182d0efa',
        '{"type": "Text", "source": "mela:annotation:8a5c971e-a185-4eaf-9ef4-8ec3cf3198df"}',
        'e8cf384d-9120-48ce-b84f-903e035e33bf', 'annotation', '8a5c971e-a185-4eaf-9ef4-8ec3cf3198df',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('ebd35cb4-5c49-428e-be08-7faeb3cfccce',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        'd5b5e0b7-e4b5-4698-b4da-b1f150c55515', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('16f3c031-7ef2-42d3-b4a1-a47dbd495c6a',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 1194, "type": "TextPositionSelector", "start": 937}, "textDirection": "ltr", "processingLanguage": "en"}',
        'd5b5e0b7-e4b5-4698-b4da-b1f150c55515', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('7fcf538d-6bf7-4ef8-abbb-8bb6824d1ae3',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        'd3ae2da0-829b-49b3-b56c-667dfbca6725', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('cc01976c-fe2b-48af-9dd8-03a66e9a4301',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 602, "type": "TextPositionSelector", "start": 425}, "textDirection": "ltr", "processingLanguage": "en"}',
        'd3ae2da0-829b-49b3-b56c-667dfbca6725', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('c584208d-d9c4-4886-8b72-d5dfe8b87a97',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 936, "type": "TextPositionSelector", "start": 604}, "textDirection": "ltr", "processingLanguage": "en"}',
        '7239b9d7-ec38-4578-bb4c-c318eeb73ae7', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('39915d85-43bd-443b-a381-f3bcba7a91ac',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('a0a0466e-800e-4c7e-ae32-f8f37ad1cea8',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 1489, "type": "TextPositionSelector", "start": 1260}, "textDirection": "ltr", "processingLanguage": "en"}',
        '7dba95bf-9ff7-4bb7-9d6c-2796b9aa4b32', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('26d7181e-e0a7-47b0-92b9-0d75140fa6be',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "processingLanguage": "en"}',
        '619a5c8c-d76f-44c6-b7d9-910f245509b7', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('d66c60a4-2190-4415-826b-baf2c0f8a845',
        '{"type": "Text", "source": "mela:text-content:a9666b2e-28a2-49c4-9135-8fd0b0405823", "selector": {"end": 601, "type": "TextPositionSelector", "start": 425}, "textDirection": "ltr", "processingLanguage": "en"}',
        '619a5c8c-d76f-44c6-b7d9-910f245509b7', 'text_content', 'a9666b2e-28a2-49c4-9135-8fd0b0405823',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('9b48c756-2c7a-4071-a568-dbc7f5301252',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'd5bf673d-fabc-406c-914e-a2e2e59956b5', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('4ae92005-2af5-4b2f-8079-8f946dc3db19',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 238, "type": "TextPositionSelector", "start": 0}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'd5bf673d-fabc-406c-914e-a2e2e59956b5', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('4f29ca56-9767-44ef-bc57-908d15c56cd1',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'c5d7ee09-4673-42c8-ae81-1dc965e29202', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('5dc9650f-8919-4831-8e45-92307e4c63f5',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 36, "type": "TextPositionSelector", "start": 17}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'c5d7ee09-4673-42c8-ae81-1dc965e29202', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('ed11030f-8d4b-459d-bfd0-b25a7ddfd790',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'c989c8ca-d556-42b0-87ac-736eda2ca7f0', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('75f3755e-480c-42bc-a05d-2c9bd12ebc8a',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 72, "type": "TextPositionSelector", "start": 39}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'c989c8ca-d556-42b0-87ac-736eda2ca7f0', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('c8413d92-3224-47a4-bbad-66c21be1ed25',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '2c941e47-9f87-43ad-a5f7-3baf156f4305', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('41324c5f-f462-4e44-b559-430fc58f2fc9',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 110, "type": "TextPositionSelector", "start": 87}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '2c941e47-9f87-43ad-a5f7-3baf156f4305', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('49bbc3da-373e-4c31-a87a-a1e116b164d8',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '0f6f40d7-3053-47bb-b4f0-7864b1bec260', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('8b30abd5-3095-436e-9213-cc760f6a3795',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 237, "type": "TextPositionSelector", "start": 0}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '0f6f40d7-3053-47bb-b4f0-7864b1bec260', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('079e372b-35c9-47f3-ae4b-f93bfe05afd6',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '849e706d-30d0-4eff-b44a-169decf05b55', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('0579aba6-94c1-4fb2-9e2f-5f01756aee4d',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 144, "type": "TextPositionSelector", "start": 132}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '849e706d-30d0-4eff-b44a-169decf05b55', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('93487d1b-3193-4dff-898f-827a3e766de5',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'a0b0b852-97c0-4185-8b5d-77ef33c5f971', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('8be575ef-29cf-4136-866c-88e5ebd73b70',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 144, "type": "TextPositionSelector", "start": 132}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'a0b0b852-97c0-4185-8b5d-77ef33c5f971', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('120d3a3e-5b2d-4d35-a93b-6093ef7c30be',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '33c6191b-b82d-4dc1-8db4-7ffa4574db97', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('fdd41f17-1a8a-4c61-8624-56b83c6d6408',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 161, "type": "TextPositionSelector", "start": 150}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '33c6191b-b82d-4dc1-8db4-7ffa4574db97', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('ec3bc5ef-3a5e-4a2c-b6ea-f71365e16146',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'ac7a50f3-901f-41f1-bae3-01737dd99f24', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('91da213f-5317-4024-a12e-421a07b8a857',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 175, "type": "TextPositionSelector", "start": 167}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'ac7a50f3-901f-41f1-bae3-01737dd99f24', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('042461b0-e8d6-4e92-bd74-47e66c9b8a6c',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '4346753d-c4dc-4970-a451-f0c66d28ed8a', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('b54d9ba9-ecd7-4a78-88b7-de11c2035f0f',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 193, "type": "TextPositionSelector", "start": 187}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '4346753d-c4dc-4970-a451-f0c66d28ed8a', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('a78a399d-f043-4f35-8b58-634a3ea88087',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '34c0b727-5555-48a2-93ff-95fd6c828c48', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('1ed040bf-8aac-43f6-a2c4-71ceb94461f0',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 236, "type": "TextPositionSelector", "start": 233}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '34c0b727-5555-48a2-93ff-95fd6c828c48', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('57a61e3a-7a85-4073-8e78-31739b79ad71',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'b1430d8b-ca61-4437-a29b-28015e7a5880', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('f2c9eb54-957e-4988-8ea0-085a6459536a',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 204, "type": "TextPositionSelector", "start": 199}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'b1430d8b-ca61-4437-a29b-28015e7a5880', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('706ff14d-e11b-4a0b-87d8-38cda36c5257',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '2f00c587-94ee-408d-ab73-dc941d084ab6', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('d4253ac2-504d-4d26-a364-c10a1bba1cea',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 215, "type": "TextPositionSelector", "start": 210}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '2f00c587-94ee-408d-ab73-dc941d084ab6', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('1d949369-9ec1-45ca-83d3-d895385106ff',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '4b574349-02a9-4a38-a926-47e81162864d', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('cffa7ca2-8366-44aa-93f2-07ac2ec511cd',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 227, "type": "TextPositionSelector", "start": 221}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '4b574349-02a9-4a38-a926-47e81162864d', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('f40b8e82-bb70-493f-99fe-6581702bf3e4',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'a56ad06f-53c3-4540-9819-bf033c6ebd97', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('98adbd07-7382-493e-b5ee-6c6d5b3f6d5d',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 25, "type": "TextPositionSelector", "start": 17}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'a56ad06f-53c3-4540-9819-bf033c6ebd97', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('fe215f42-ffd7-4517-a13e-62844c2f2d26',
        '{"type": "Text", "source": "mela:annotation:c5d7ee09-4673-42c8-ae81-1dc965e29202"}',
        '6ec5cebb-dabd-40f6-8244-80da93b7a63d', 'annotation', 'c5d7ee09-4673-42c8-ae81-1dc965e29202',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('acb571bb-9d5b-4e5b-b552-8412177bc6d4',
        '{"type": "Text", "source": "mela:annotation:a56ad06f-53c3-4540-9819-bf033c6ebd97"}',
        '6ec5cebb-dabd-40f6-8244-80da93b7a63d', 'annotation', 'a56ad06f-53c3-4540-9819-bf033c6ebd97',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('1678851f-330e-402a-b2a0-9e6783aa325b',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        'aed78aa3-5191-4487-8363-7a1a47ce2b72', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('b6dad2cc-9b3b-4d78-b426-1c28cf0d00f1',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 48, "type": "TextPositionSelector", "start": 43}, "textDirection": "ltr", "processingLanguage": "gr"}',
        'aed78aa3-5191-4487-8363-7a1a47ce2b72', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('169e5b14-00c5-4369-bbdd-de3fb68fec5c',
        '{"type": "Text", "source": "mela:annotation:c989c8ca-d556-42b0-87ac-736eda2ca7f0"}',
        '1a1b16b8-a315-4b51-bd81-1c717f0e3058', 'annotation', 'c989c8ca-d556-42b0-87ac-736eda2ca7f0',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('5d0b54f6-3edc-460e-9d51-fdb8b4b73634',
        '{"type": "Text", "source": "mela:annotation:aed78aa3-5191-4487-8363-7a1a47ce2b72"}',
        '1a1b16b8-a315-4b51-bd81-1c717f0e3058', 'annotation', 'aed78aa3-5191-4487-8363-7a1a47ce2b72',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('0c3e2fb2-5402-4793-97af-6b86c9f8f22a',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "processingLanguage": "gr"}',
        '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('972ac303-5282-4db0-a1f4-88babf2f93c3',
        '{"type": "Text", "source": "mela:text-content:cbf90100-245d-464a-8388-f1dd295ec4ae", "selector": {"end": 95, "type": "TextPositionSelector", "start": 87}, "textDirection": "ltr", "processingLanguage": "gr"}',
        '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0', 'text_content', 'cbf90100-245d-464a-8388-f1dd295ec4ae',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('d749037f-dc5a-4f80-977a-528694e21223',
        '{"type": "Text", "source": "mela:annotation:2c941e47-9f87-43ad-a5f7-3baf156f4305"}',
        'b077dd1d-9a2f-49fe-9281-dff1102f3458', 'annotation', '2c941e47-9f87-43ad-a5f7-3baf156f4305',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
INSERT INTO public.annotation_target (id, value, annotation_id, source_type, source_id, created_at, updated_at)
VALUES ('19aa9780-9f35-4491-b896-b022b14d8b4c',
        '{"type": "Text", "source": "mela:annotation:918cf1a2-32b3-4eb7-b49b-d1f7294f66e0"}',
        'b077dd1d-9a2f-49fe-9281-dff1102f3458', 'annotation', '918cf1a2-32b3-4eb7-b49b-d1f7294f66e0',
        '2025-05-06 21:42:46.767', '2025-05-06 21:42:46.767');
