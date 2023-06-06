export type DocFlags = {
	isOptional?: boolean;
	isExternal?: boolean;
	isRest?: boolean;
};

export type DocTag = {
	tag: string;
	text: string;
};

export type DocComment = {
	shortText: string;
	text?: string;
	returns?: string;
	tags?: DocTag[];
};

export type DocTypeNamedTupleMember = {
	type: 'named-tuple-member';
	name: string;
	isOptional: boolean;
	element: DocTypeIntrinsic;
};

export type DocTypeMapped = {
	type: 'mapped';
	parameter: string;
	parameterType: DocTypeReference;
	templateType: DocTypeIndexedAccess;
};

export type DocTypeOperator = {
	type: 'typeOperator';
	operator: string;
	target: DocTypeIntrinsic | DocTypeReference;
};

export type DocTypeIntrinsic = {
	type: 'intrinsic';
	name: string;
};

export type DocTypeIndexedAccess = {
	type: 'indexedAccess';
	indexType: DocTypeReference;
	objectType: DocTypeReference;
};

export type DocTypeReference = {
	type: 'reference';
	name: string;
	id?: number;
	qualifiedName?: string;
	package?: string;
	typeArguments?: (DocTypeIntrinsic | DocTypeReference | DocTypeOperator)[];
};

export type DocTypeTuple = {
	type: 'tuple';
	elements?: (DocTypeNamedTupleMember | DocTypeReference | DocTypeArray | DocTypeIntrinsic)[];
};

export type DocTypeIntersection = {
	type: 'intersection';
	types: (DocTypeReference | DocTypeReflection)[];
};

export type DocTypePredicate = {
	type: 'predicate';
	name: string;
	asserts: boolean;
	targetType: DocTypeIntrinsic | DocTypeReference;
};

export type DocTypeArray = {
	type: 'array';
	elementType: DocTypeIntrinsic;
};

export type DocTypeReflection = {
	type: 'reflection';
	declaration: TypeLiteralKind;
};

export type DocTypeLiteral = {
	type: 'literal';
	value: boolean | null;
};

export type DocTypeUnion = {
	type: 'union';
	types: (DocTypeIntrinsic | DocTypeReference | DocTypeLiteral | DocTypeTuple)[];
};

export type DocTypeConditional = {
	type: 'conditional';
	checkType: DocTypeReference;
	extendsType: DocTypeReference;
	trueType: DocTypeIntrinsic | DocTypeReference;
	falseType: DocTypeIntrinsic | DocTypeReference;
};

export type DocType =
	| DocTypeNamedTupleMember
	| DocTypeMapped
	| DocTypeOperator
	| DocTypeIntrinsic
	| DocTypeIndexedAccess
	| DocTypeReference
	| DocTypeTuple
	| DocTypeIntersection
	| DocTypePredicate
	| DocTypeTuple
	| DocTypeArray
	| DocTypeReflection
	| DocTypeLiteral
	| DocTypeUnion
	| DocTypeConditional;

export type DocSource = {
	fileName: string;
	line: number;
	character: number;
};

export type RootDocObject = {
	id: number;
	name: string;
	kind: 1;
	flags: DocFlags;
	originalName: string;
	children: ModuleKind[];
	groups: GroupKind[];
};

type KindBase = {
	id: number;
	name: string;
	kind: number;
	kindString: string;
	flags: DocFlags;
	comment?: DocComment;
};

export type GroupKind = NamespacesGroup | VariablesGroup | TypeAliasesGroup | FunctionsGroup;

export type ModuleKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 2;
	kindString: 'Module';
	children: (FunctionKind | NamespaceKind | TypeAliasKind | VariableKind)[];
	groups: GroupKind[];
	sources?: DocSource[];
};

export type NamespaceKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 4;
	kindString: 'Namespace';
	children: (TypeAliasKind | InterfaceKind | VariableKind)[];
	groups: GroupKind[];
};

export type TypeAliasKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 4194304;
	kindString: 'Type alias';
	type:
		| DocTypeReference
		| DocTypeReflection
		| DocTypeTuple
		| DocTypeIntersection
		| DocTypeConditional
		| DocTypeMapped;
	sources?: DocSource[];
	typeParameter?: TypeParameterKind[];
};

export type TypeLiteralKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 65536;
	kindString: 'Type literal';

	sources: DocSource[];
} & (
		| { children: PropertyKind[]; groups: PropertiesGroup[]; signatures: never }
		| { children: never; groups: never; signatures: CallSignatureKind[] }
	);

export type TypeParameterKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 131072;
	kindString: 'Type parameter';
	type?: DocTypeOperator;
	default?: DocTypeIntrinsic;
};

export type FunctionKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 64;
	kindString: 'Function';
	sources: DocSource[];
	signatures: CallSignatureKind[];
};

export type MethodKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 2048;
	kindString: 'Method';
	signatures: CallSignatureKind[];
	overwrites?: DocTypeReference;
};

export type VariableKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 32;
	kindString: 'Variable';
	sources?: DocSource[];
	type: DocTypeReference;
	defaultValue?: string;
};

export type CallSignatureKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 4096;
	kindString: 'Call signature';
	parameters?: ParameterKind[];
	type: DocTypeIntrinsic | DocTypePredicate;
	overwrites?: DocTypeReference;
};

export type ParameterKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 32768;
	kindString: 'Parameter';
	type: DocTypeIntrinsic | DocTypeArray | DocTypeTuple;
	defaultValue?: string;
};

export type InterfaceKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 256;
	kindString: 'Interface';
	children: (PropertyKind | MethodKind)[];
	groups: GroupKind[];
	sources?: DocSource[];
	typeParameter?: TypeParameterKind[];
	extendedTypes?: DocTypeReference[];
	extendedBy?: DocTypeReference[];
};

export type PropertyKind = Omit<KindBase, 'kind' | 'kindString'> & {
	kind: 256;
	kindString: 'Property';
	children: PropertyKind[];
	sources?: DocSource[];
	type: DocTypeIntrinsic;
};

export type VariablesGroup = {
	title: 'Variables';
	kind: VariableKind['kind'];
	children: number[];
};

export type FunctionsGroup = {
	title: 'Functions';
	kind: FunctionKind['kind'];
	children: number[];
};

export type NamespacesGroup = {
	title: 'Namespaces';
	kind: 64;
	children: number[];
};

export type TypeAliasesGroup = {
	title: 'Type Aliases';
	kind: 4194304;
	children: number[];
};
export type PropertiesGroup = {
	title: 'Properties';
	kind: 1024;
	children: number[];
};
