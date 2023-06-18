import { ReflectionKind } from 'typedoc';

type BaseProps = {
  id: number;
  name: string;
  variant: string;
  flags: Flags;
  comment?: Comment;
  sources?: Source[];
  groups?: Group[];
};

export type Flags = {
  isOptional?: boolean;
  isExternal?: boolean;
  isRest?: boolean;
  isReadonly?: boolean;
};

export type Comment = {
  summary: Summary[];
  blockTags?: BlogTag[];
};

export type BlogTag = {
  tag: string;
  content: Summary[];
};

export type Summary = {
  kind: string;
  text: string;
};

type Source = {
  fileName: string;
  line: number;
  character: number;
  url: string;
};

type Group = {
  title: string;
  children: number[];
};

type Target = {
  sourceFileName: string;
  qualifiedName: string;
};

export type Type_Tuple = {
  type: 'tuple';
  elements: (Element_NamedTupleMember | Type_Intrinsic | Type_Reference)[];
};

export type Type_Literal = {
  type: 'literal';
  value: string;
};

export type Type_Intrinsic = {
  type: 'intrinsic';
  name: string;
};

export type Type_Array = {
  type: 'array';
  elementType: Type_Intrinsic | Type_Reference;
};

export type Type_Union = {
  type: 'union';
  types: Basic_Types[];
};

export type Type_Predicate = {
  type: 'predicate';
  name: string;
  asserts: boolean;
  targetType: Type_Intrinsic | Type_Reference;
};

export type Type_Intersection = {
  type: 'intersection';
  types: (Type_Reference | Type_Reflection)[];
};

export type Type_Reference = {
  type: 'reference';
  target: number | Target;
  typeArguments?: Basic_Types[];
  name: string;
  package: string;
};

export type Type_Reflection = {
  type: 'reflection';
  declaration: Kind_Literal;
};

export type Element_NamedTupleMember = {
  type: 'namedTupleMember';
  name: string;
  isOptional: boolean;
  element: Basic_Types;
  defaultValue?: string;
};

type Basic_Types =
  | Type_Intrinsic
  | Type_Reference
  | Type_Array
  | Type_Tuple
  | Type_Union
  | Type_Literal;

export type All_Types =
  | Basic_Types
  | Type_Intersection
  | Type_Reflection
  | Element_NamedTupleMember
  | Type_Predicate;

export type Kind_Project = BaseProps & {
  kind: ReflectionKind.Project;
  children: Kind_Module[];
  packageName: string;
  symbolIdMap: Record<string, Target>;
};

export type Kind_Module = BaseProps & {
  kind: ReflectionKind.Module;
  children: (Kind_TypeAlias | Kind_Function | Kind_Variable)[];
};

export type Kind_Variable = BaseProps & {
  kind: ReflectionKind.Variable;
  type: Basic_Types;
  defaultValue?: string;
};

export type Kind_Function = BaseProps & {
  kind: ReflectionKind.Function;
  signatures: Kind_Signature[];
};

export type Kind_Property = BaseProps & {
  kind: ReflectionKind.Property;
  type: Basic_Types;
  defaultValue?: string;
};

export type Kind_Signature = BaseProps & {
  kind: ReflectionKind.CallSignature;
  parameters?: Kind_Param[];
  type: Basic_Types;
};

export type Kind_Param = BaseProps & {
  kind: ReflectionKind.Parameter;
  type: Basic_Types;
  defaultValue?: string;
};

export type Kind_Literal = BaseProps & {
  kind: ReflectionKind.TypeLiteral;
  children?: Kind_Property[];
  signatures?: Kind_Signature[];
};

export type Kind_TypeAlias = BaseProps & {
  kind: ReflectionKind.TypeAlias;
  type: Type_Intersection;
};
