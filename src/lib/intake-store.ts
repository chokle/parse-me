import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  listDocs,
  submitDoc as submitDocFn,
  setDocStatus as setDocStatusFn,
  setDocsStatus as setDocsStatusFn,
  updateDocField as updateDocFieldFn,
  clearAllDocs as clearAllDocsFn,
  type IntakeDoc,
  type DocStatus,
  type AuditEvent,
  type AuditAction,
  type ExtractedField,
} from "./intake.functions";
import type { Reviewer } from "./reviewer-identity";

export type { IntakeDoc, DocStatus, AuditEvent, AuditAction, ExtractedField };

const DOCS_KEY = ["intake-docs"] as const;

export function useIntakeDocs() {
  const list = useServerFn(listDocs);
  const q = useQuery({
    queryKey: DOCS_KEY,
    queryFn: () => list(),
    refetchInterval: 5000,
  });
  return q.data ?? [];
}

export function useIntakeMutations() {
  const qc = useQueryClient();
  const submit = useServerFn(submitDocFn);
  const setStatus = useServerFn(setDocStatusFn);
  const setStatusBulk = useServerFn(setDocsStatusFn);
  const editField = useServerFn(updateDocFieldFn);
  const clear = useServerFn(clearAllDocsFn);

  const invalidate = () => qc.invalidateQueries({ queryKey: DOCS_KEY });

  return {
    submitDoc: useMutation({
      mutationFn: (data: { name: string; source: string }) => submit({ data }),
      onSuccess: invalidate,
    }),
    setDocStatus: useMutation({
      mutationFn: (data: { id: string; status: DocStatus; note?: string; reviewer: Reviewer }) =>
        setStatus({ data }),
      onSuccess: invalidate,
    }),
    setDocsStatus: useMutation({
      mutationFn: (data: { ids: string[]; status: DocStatus; note?: string; reviewer: Reviewer }) =>
        setStatusBulk({ data }),
      onSuccess: invalidate,
    }),
    updateDocField: useMutation({
      mutationFn: (data: { id: string; key: string; value: string; reviewer: Reviewer }) =>
        editField({ data }),
      onSuccess: invalidate,
    }),
    clearAll: useMutation({
      mutationFn: () => clear(),
      onSuccess: invalidate,
    }),
  };
}
