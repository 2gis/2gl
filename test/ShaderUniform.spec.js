import ShaderUniform from '../src/ShaderUniform';
import GlContext from './utils/GlContext';

describe('ShaderUniform', () => {
    let gl;

    beforeEach(() => {
        gl = new GlContext();
    });

    describe('#bind', () => {
        const types = [
            'mat2', 'mat3', 'mat4',
            '1f', '2f', '3f', '4f',
            '1i', '2i', '3i', '4i',
            '1fv', '2fv', '3fv', '4fv',
            '1iv', '2iv', '3iv', '4iv'
        ];

        types.forEach(type => {
            it(`should work with ${type} type`, () => {
                const uniform = new ShaderUniform({
                    name: 'testName',
                    type: type
                });

                uniform.bind(gl, []);
            });
        });
    });
});
